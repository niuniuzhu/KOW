using CentralServer.User;
using Core.Misc;
using Google.Protobuf;
using Shared;
using System;
using System.Collections.Generic;
using BSInfo = Shared.BSInfo;

namespace CentralServer.Match
{
	public class Matcher
	{
		private static readonly ObjectPool<Room> POOL = new ObjectPool<Room>( 50, 25 );

		private readonly List<Room> _freeRooms = new List<Room>();
		private readonly List<Room> _fullRooms = new List<Room>();
		private readonly Dictionary<uint, Room> _idToRoom = new Dictionary<uint, Room>();

		/// <summary>
		/// 强制把指定ID玩家踢除
		/// </summary>
		public bool OnUserKicked( ulong gcNID )
		{
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Error( $"can not find user:{gcNID}" );
				return false;
			}
			if ( !user.inRoom || !this._idToRoom.TryGetValue( user.roomID, out Room room ) )
			{
				Logger.Error( $"player:{gcNID} not in room" );
				return false;
			}
			PlayerInfo player = room.GetPlayer( gcNID );
			if ( player == null )
			{
				Logger.Error( $"player:{gcNID} not in room" );
				return false;
			}
			this.RemovePlayer( room, player, user );
			return true;
		}

		private void AddPlayer( Room room, PlayerInfo player, CUser user )
		{
			room.AddPlayer( player );
			user.roomID = room.id;
			user.inRoom = true;

			//通知gc有玩家加入房间
			Protos.CS2GC_PlayerJoin playerJoin = ProtoCreator.Q_CS2GC_PlayerJoin();
			playerJoin.PlayerInfos = new Protos.Room_PlayerInfo
			{
				GcNID = player.gcNID,
				Name = player.uname,
				ActorID = player.actorID
			};
			this.Broadcast( room, playerJoin );
		}

		/// <summary>
		/// 移除玩家
		/// 该方法不检查参数合法性
		/// </summary>
		private void RemovePlayer( Room room, PlayerInfo player, CUser user )
		{
			room.RemovePlayer( player );
			user.inRoom = false;
			user.roomID = 0;

			//通知gc有玩家离开房间
			Protos.CS2GC_PlayerLeave playerLeave = ProtoCreator.Q_CS2GC_PlayerLeave();
			playerLeave.GcNID = player.gcNID;
			this.Broadcast( room, playerLeave );

			if ( room.isEmpty )
				this.DestroyRoom( room, true );
		}

		private Room JoinRoom()
		{
			Room room;
			if ( this._freeRooms.Count > 0 )
			{
				//todo 当前随机加入处理
				Random rnd = new Random();
				room = this._freeRooms[rnd.Next( 0, this._freeRooms.Count )];
			}
			else
				room = this.CreateRoom();
			return room;
		}

		private Room CreateRoom()
		{
			Room room = POOL.Pop();
			Logger.Log( $"room:{room.id} was created" );
			this._freeRooms.Add( room );
			this._idToRoom[room.id] = room;
			return room;
		}

		private void DestroyRoom( Room room, bool isInFreeRoom )
		{
			this._idToRoom.Remove( room.id );
			if ( isInFreeRoom )
				this._freeRooms.Remove( room );
			else
				this._fullRooms.Remove( room );
			POOL.Push( room );
			Logger.Log( $"room:{room.id} was destroied" );
		}

		private Room GetRoom( ulong gcNID )
		{
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Error( $"can not find user:{gcNID}" );
				return null;
			}
			if ( user.inRoom && this._idToRoom.TryGetValue( user.roomID, out Room room ) && room.HasPlayer( gcNID ) )
				return room;
			return null;
		}

		/// <summary>
		/// 处理玩家开始匹配
		/// </summary>
		public ErrorCode OnGc2CsBeginMatch( uint sid, IMessage message )
		{
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch ) message;
			ulong gcNID = beginMatch.Opts.Transid;

			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Error( $"invalid gcNID:{gcNID}" );
				return ErrorCode.Success;
			}

			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );
			ret.MTrans( Protos.MsgOpts.Types.TransTarget.Gc, gcNID );

			//加入或创建房间
			Room room = this.JoinRoom();
			if ( room == null )
			{
				ret.Result = Protos.Global.Types.ECommon.Failed;
				return ErrorCode.Success;
			}

			ret.Result = Protos.Global.Types.ECommon.Success;
			ret.Id = room.id;
			ret.MapID = room.mapID;
			ret.MaxPlayer = room.maxPlayers;
			this.FillProtoPlayerInfo( room, ret.PlayerInfos );

			PlayerInfo player = new PlayerInfo( gcNID );
			player.actorID = beginMatch.ActorID;

			if ( !room.CanAddPlayer( player ) )
			{
				//加入失败,如果房间没玩家,则销毁房间
				if ( room.isEmpty )
				{
					Logger.Log( $"room:{room.id} was destroied" );
					POOL.Push( room );
				}
				return ErrorCode.Success;
			}
			//发送回应
			CS.instance.netSessionMgr.Send( sid, ret );

			this.AddPlayer( room, player, user );

			if ( room.isFull )
			{
				room.started = true;
				this._freeRooms.Remove( room );
				this._fullRooms.Add( room );
			}

			return ErrorCode.Success;
		}

		/// <summary>
		/// 处理玩家提交的信息
		/// </summary>
		public ErrorCode OnGc2CsUpdatePlayerInfo( IMessage message )
		{
			Protos.GC2CS_UpdatePlayerInfo updatePlayerInfo = ( Protos.GC2CS_UpdatePlayerInfo ) message;
			ulong gcNID = updatePlayerInfo.Opts.Transid;
			Room room = this.GetRoom( gcNID );
			if ( room == null )
				Logger.Warn( $"player:{gcNID} not in room" );
			else
			{
				PlayerInfo player = room.GetPlayer( gcNID );//由于上面调用GetRoom方法已确保player存在,这里不用再判空了
				player.progress = updatePlayerInfo.Progress;
			}
			return ErrorCode.Success;
		}

		/// <summary>
		/// 通知客户端更新房间信息
		/// </summary>
		private void NotifyRoomInfos( Room room )
		{
			Protos.CS2GC_RoomInfo roomInfo = ProtoCreator.Q_CS2GC_RoomInfo();
			this.FillProtoPlayerInfo( room, roomInfo.PlayerInfos );
			//输入进度
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				PlayerInfo player = room.GetPlayerAt( i );
				roomInfo.Progresses.Add( player.progress );
			}
			this.Broadcast( room, roomInfo );
		}

		/// <summary>
		/// 所有玩家准备完成,发送BS信息
		/// </summary>
		private void BeginBattle( Room room )
		{
			//没有找到合适的bs,通知客户端匹配失败
			if ( CS.instance.appropriateBSInfo == null )
			{
				this.NotifyGCBeginFailed( room, Protos.CS2GC_BSInfo.Types.Error.BsnotFound );
				return;
			}

			BSInfo selectedBSInfo = CS.instance.appropriateBSInfo;
			//先通知BS
			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.Id = room.id;
			battleInfo.MapID = room.mapID;
			this.FillProtoPlayerInfo( room, battleInfo.PlayerInfo );
			CS.instance.netSessionMgr.Send( selectedBSInfo.sessionID, battleInfo, msg =>
			{
				//避免在消息发送期间,BS可能发生意外丢失,这里需要再检查一次
				if ( !CS.instance.LIDToBSInfos.ContainsKey( selectedBSInfo.lid ) )
				{
					this.NotifyGCBeginFailed( room, Protos.CS2GC_BSInfo.Types.Error.Bslost );
					return;
				}
				Protos.CS2GC_BSInfo beginBattle = ProtoCreator.Q_CS2GC_BSInfo();
				beginBattle.Ip = CS.instance.appropriateBSInfo.ip;
				beginBattle.Port = CS.instance.appropriateBSInfo.port;
				this.Broadcast( room, beginBattle, 0, ( m, player ) =>
				{
					Protos.CS2GC_BSInfo m2 = ( Protos.CS2GC_BSInfo ) m;
					m2.GcNID = player.gcNID;
				} );
			} );
		}

		private void NotifyGCBeginFailed( Room room, Protos.CS2GC_BSInfo.Types.Error error )
		{
			Protos.CS2GC_BSInfo beginBattle = ProtoCreator.Q_CS2GC_BSInfo();
			beginBattle.Error = error;
			this.Broadcast( room, beginBattle );
		}

		private void FillProtoPlayerInfo( Room room, Google.Protobuf.Collections.RepeatedField<Protos.Room_PlayerInfo> repeatedField )
		{
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				PlayerInfo player = room.GetPlayerAt( i );
				Protos.Room_PlayerInfo pi = new Protos.Room_PlayerInfo();
				pi.GcNID = player.gcNID;
				pi.Name = CS.instance.userMgr.GetUser( player.gcNID ).name;
				pi.ActorID = player.actorID;
				repeatedField.Add( pi );
			}
		}

		private void Broadcast( Room room, IMessage msg, ulong gcNID = 0, Action<IMessage, PlayerInfo> msgModifier = null )
		{
			for ( int i = 0; i < room.numPlayers; ++i )
			{
				PlayerInfo player = room.GetPlayerAt( i );
				if ( gcNID != 0 && player.gcNID == gcNID )
					continue;
				msgModifier?.Invoke( msg, player );
				CS.instance.userMgr.SendToUser( player.gcNID, msg );
			}
		}

		public void OnHeartBeat( long dt )
		{
			int count = this._fullRooms.Count;
			for ( int i = 0; i < count; i++ )
			{
				Room room = this._fullRooms[i];
				room.Update( dt );

				if ( room.timeToNitifyPlayerInfos == 0 )
					this.NotifyRoomInfos( room );

				//未满员的放假继续等待
				//检查房间是否所有玩家准备完成或者超时
				if ( room.started && ( room.CheckAllPlayerReady() || room.timeout ) )
				{
					this.BeginBattle( room );
					this.DestroyRoom( room, false );
					--i;
					--count;
				}
			}
		}
	}
}