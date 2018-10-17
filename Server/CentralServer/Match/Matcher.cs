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

		public bool OnUserKicked( ulong gcNID )
		{
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Error( $"can not find user:{gcNID}" );
				return false;
			}
			if ( user.inRoom && this._idToRoom.TryGetValue( user.room, out Room room ) )
			{
				if ( !room.RemovePlayer( gcNID ) )
					return false;
				if ( room.isEmpty )
					this.DestroyRoom( room, true );
			}
			return true;
		}

		private Room CreateRoom( CUser user, PlayerInfo player )
		{
			Room room = POOL.Pop();
			Logger.Log( $"room:{room.id} was created" );
			if ( !room.AddPlayer( player ) )
			{
				Logger.Log( $"room:{room.id} was destroied" );
				POOL.Push( room );
				return null;
			}
			this._freeRooms.Add( room );
			this._idToRoom[room.id] = room;
			user.room = room.id;
			user.inRoom = true;
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
			if ( user.inRoom && this._idToRoom.TryGetValue( user.room, out Room room ) )
				return room;
			return null;
		}

		private Room SelectRoom( PlayerInfo player )
		{
			CUser user = CS.instance.userMgr.GetUser( player.gcNID );
			if ( user == null )
			{
				Logger.Error( $"invalid gcNID:{player.gcNID}" );
				return null;
			}

			if ( this._freeRooms.Count > 0 )
			{
				//todo 当前随机加入处理
				Random rnd = new Random();
				int index = rnd.Next( 0, this._freeRooms.Count );

				Room room = this._freeRooms[index];
				if ( !room.AddPlayer( player ) )
					return null;

				user.room = room.id;
				user.inRoom = true;
				return room;
			}
			return this.CreateRoom( user, player );
		}

		/// <summary>
		/// 处理玩家开始匹配
		/// </summary>
		public ErrorCode OnGc2CsBeginMatch( uint sid, IMessage message )
		{
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch ) message;
			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );
			ret.MTrans( Protos.MsgOpts.Types.TransTarget.Gc, beginMatch.Opts.Transid );
			ret.Result = Protos.Global.Types.ECommon.Success;

			PlayerInfo player = new PlayerInfo( beginMatch.Opts.Transid );
			player.actorID = beginMatch.ActorID;

			Room room = this.SelectRoom( player );
			if ( room == null )
				ret.Result = Protos.Global.Types.ECommon.Failed;

			CS.instance.netSessionMgr.Send( sid, ret );

			if ( room != null && room.isFull )
			{
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
				room.UpdatePlayerProgress( gcNID, updatePlayerInfo.Progress );
			return ErrorCode.Success;
		}

		/// <summary>
		/// 通知客户端更新房间信息
		/// </summary>
		private void NotifyRoomInfos( Room room )
		{
			Protos.CS2GC_RoomInfo roomInfo = ProtoCreator.Q_CS2GC_RoomInfo();
			roomInfo.Id = room.id;
			roomInfo.MapID = room.mapID;
			roomInfo.IsFull = room.isFull;
			room.FillProtoPlayerInfo( roomInfo.PlayerInfos );
			for ( int i = 0; i < room.numPlayer; ++i )
			{
				ulong gcNID = room.GetPlayerAt( i ).gcNID;
				CS.instance.userMgr.SendToUser( gcNID, roomInfo );
			}
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
			room.FillProtoPlayerInfo( battleInfo.PlayerInfo );
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
				for ( int i = 0; i < room.numPlayer; ++i )
				{
					ulong gcNID = room.GetPlayerAt( i ).gcNID;
					beginBattle.GcNID = gcNID;
					CS.instance.userMgr.SendToUser( gcNID, beginBattle );
				}
			} );
		}

		private void NotifyGCBeginFailed( Room room, Protos.CS2GC_BSInfo.Types.Error error )
		{
			Protos.CS2GC_BSInfo beginBattle = ProtoCreator.Q_CS2GC_BSInfo();
			beginBattle.Error = error;
			for ( int i = 0; i < room.numPlayer; ++i )
			{
				ulong gcNID = room.GetPlayerAt( i ).gcNID;
				CS.instance.userMgr.SendToUser( gcNID, beginBattle );
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
				if ( room.isFull && ( room.CheckAllPlayerReady() || room.timeout ) )
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