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

		/// <summary>
		/// 还在等待玩家进入的房间
		/// </summary>
		private readonly List<Room> _freeRooms = new List<Room>();
		/// <summary>
		/// 满员的房间
		/// </summary>
		private readonly List<Room> _fullRooms = new List<Room>();
		/// <summary>
		/// 等待消息确认的房间
		/// </summary>
		private readonly List<Room> _transits = new List<Room>();
		/// <summary>
		/// 房间ID对应的房间实例
		/// </summary>
		private readonly Dictionary<uint, Room> _idToRoom = new Dictionary<uint, Room>();
		/// <summary>
		/// 战场ID对应的玩家网络ID
		/// 当BS确认战场创建后,这里需要记录这个信息,用于战斗通信可以快速找到玩家
		/// </summary>
		private readonly Dictionary<uint, List<ulong>> _bIDToGCNID = new Dictionary<uint, List<ulong>>();

		/// <summary>
		/// 强制把指定ID玩家踢除
		/// </summary>
		public bool OnUserKicked( CSUser user )
		{
			if ( !user.inRoom || !this._idToRoom.TryGetValue( user.roomID, out Room room ) )
			{
				Logger.Error( $"player:{user.gcNID} not in room" );
				return false;
			}
			PlayerInfo player = room.GetPlayer( user.gcNID );
			if ( player == null )
			{
				Logger.Error( $"player:{user.gcNID} not in room" );
				return false;
			}
			this.RemovePlayer( room, player, user );
			return true;
		}

		/// <summary>
		/// 添加玩家
		/// </summary>
		private void AddPlayer( Room room, PlayerInfo player, CSUser user )
		{
			room.AddPlayer( player );
			user.roomID = room.id;
			user.inRoom = true;

			//通知gc有玩家加入房间
			Protos.CS2GC_PlayerJoin playerJoin = ProtoCreator.Q_CS2GC_PlayerJoin();
			playerJoin.PlayerInfos = new Protos.CS2GC_PlayerInfo
			{
				GcNID = player.gcNID,
				Name = player.uname,
				ActorID = player.actorID
			};
			this.Broadcast( room, playerJoin );
		}

		/// <summary>
		/// 移除玩家
		/// </summary>
		private void RemovePlayer( Room room, PlayerInfo player, CSUser user )
		{
			room.RemovePlayer( player );
			user.inRoom = false;
			user.roomID = 0;

			//通知gc有玩家离开房间
			Protos.CS2GC_PlayerLeave playerLeave = ProtoCreator.Q_CS2GC_PlayerLeave();
			playerLeave.GcNID = player.gcNID;
			this.Broadcast( room, playerLeave );

			if ( room.isEmpty )
				this.DestroyRoom( room, 0 );
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

		private void DestroyRoom( Room room, int type )
		{
			this._idToRoom.Remove( room.id );
			if ( type == 0 )
				this._freeRooms.Remove( room );
			else if ( type == 1 )
				this._transits.Remove( room );
			POOL.Push( room );
			Logger.Log( $"room:{room.id} was destroied" );
		}

		private Room GetRoom( ulong gcNID )
		{
			CSUser user = CS.instance.userMgr.GetUser( gcNID );
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
		public ErrorCode BeginMatch( uint sid, IMessage message )
		{
			//todo 这里需要检查发起匹配的合法性,由于是客户端主动调用的.例如处于战场状态或维护状态不能发起匹配

			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch ) message;
			ulong gcNID = beginMatch.Opts.Transid;

			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Error( $"invalid gcNID:{gcNID}" );
				return ErrorCode.Success;
			}

			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );

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

			PlayerInfo player = new PlayerInfo( gcNID, user.ukey );
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
			CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );

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
				this.NotifyGCBeginFailed( room, Protos.CS2GC_EnterBattle.Types.Error.BsnotFound );
				this.DestroyRoom( room, 1 );
				return;
			}

			BSInfo selectedBSInfo = CS.instance.appropriateBSInfo;
			//先通知BS创建战场
			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.MapID = room.mapID;
			battleInfo.Timeout = ( int ) Consts.WAITING_ROOM_TIME_OUT;
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				PlayerInfo player = room.GetPlayerAt( i );
				Protos.CS2BS_PlayerInfo pi = new Protos.CS2BS_PlayerInfo
				{
					GcNID = player.ukey | ( ulong ) CS.instance.appropriateBSInfo.lid << 32,
					Name = CS.instance.userMgr.GetUser( player.gcNID ).name,
					ActorID = player.actorID
				};
				battleInfo.PlayerInfo.Add( pi );
			}
			//发送到BS
			CS.instance.netSessionMgr.Send( selectedBSInfo.sessionID, battleInfo, msg =>
			{
				//这个回调表示BS通知CS战场创建完成了

				Protos.BS2CS_BattleInfoRet ret = ( Protos.BS2CS_BattleInfoRet ) msg;
				//把房间ID和玩家在BS上的网络ID联系起来,以便在战场结束后迅速找到玩家
				int count = room.numPlayers;
				for ( int i = 0; i < count; i++ )
				{
					PlayerInfo player = room.GetPlayerAt( i );
					this._bIDToGCNID.AddToList( ret.Bid, player.ukey | ( ulong ) CS.instance.appropriateBSInfo.lid << 32 );
				}

				//避免在消息发送期间,BS可能发生意外丢失,这里需要再检查一次
				if ( !CS.instance.LIDToBSInfos.ContainsKey( selectedBSInfo.lid ) )
					this.NotifyGCBeginFailed( room, Protos.CS2GC_EnterBattle.Types.Error.Bslost );
				else
				{
					count = room.numPlayers;
					for ( int i = 0; i < count; i++ )
					{
						PlayerInfo player = room.GetPlayerAt( i );
						CSUser user = CS.instance.userMgr.GetUser( player.ukey );
						//记录BS逻辑ID
						user.bsNID = CS.instance.appropriateBSInfo.lid;
						//设置玩家为战场状态
						user.state = CSUser.State.Battle;
					}

					Protos.CS2GC_EnterBattle enterBattle = ProtoCreator.Q_CS2GC_EnterBattle();
					enterBattle.Ip = CS.instance.appropriateBSInfo.ip;
					enterBattle.Port = CS.instance.appropriateBSInfo.port;
					this.Broadcast( room, enterBattle, 0, ( m, player ) =>
					{
						Protos.CS2GC_EnterBattle m2 = ( Protos.CS2GC_EnterBattle ) m;
						m2.GcNID = player.ukey | ( ulong ) CS.instance.appropriateBSInfo.lid << 32;
					} );
				}
				this.DestroyRoom( room, 1 );
			} );
		}

		private void NotifyGCBeginFailed( Room room, Protos.CS2GC_EnterBattle.Types.Error error )
		{
			Protos.CS2GC_EnterBattle bsInfo = ProtoCreator.Q_CS2GC_EnterBattle();
			bsInfo.Error = error;
			this.Broadcast( room, bsInfo );
		}

		private void FillProtoPlayerInfo( Room room, Google.Protobuf.Collections.RepeatedField<Protos.CS2GC_PlayerInfo> repeatedField )
		{
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				PlayerInfo player = room.GetPlayerAt( i );
				Protos.CS2GC_PlayerInfo pi = new Protos.CS2GC_PlayerInfo();
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
					this._fullRooms.RemoveAt( i );
					this._transits.Add( room );
					this.BeginBattle( room );
					--i;
					--count;
				}
			}
		}
	}
}