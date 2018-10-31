using CentralServer.User;
using Core.Misc;
using Google.Protobuf;
using Shared;
using Shared.Battle;
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
		/// 强制把指定ID玩家踢除
		/// </summary>
		public void OnUserKicked( CSUser user )
		{
			if ( !user.IsInRoom || !this._idToRoom.TryGetValue( user.roomID, out Room room ) )
				return;

			RoomPlayer player = room.GetPlayer( user.gcNID );
			this.RemovePlayer( room, player, user );
		}

		/// <summary>
		/// 添加玩家
		/// </summary>
		private void AddPlayer( Room room, RoomPlayer player, CSUser user )
		{
			room.AddPlayer( player );
			user.roomID = room.id;
			user.IsInRoom = true;

			Logger.Log( $"user:{user.gcNID} join room:{room.id}" );

			//通知GC有玩家加入房间
			Protos.CS2GC_PlayerJoin playerJoin = ProtoCreator.Q_CS2GC_PlayerJoin();
			playerJoin.PlayerInfos = new Protos.CS2GC_PlayerInfo
			{
				GcNID = player.gcNID,
				Name = player.uname,
				ActorID = player.actorID,
				Team = player.team
			};
			this.Broadcast( room, playerJoin );
		}

		/// <summary>
		/// 移除玩家
		/// </summary>
		private void RemovePlayer( Room room, RoomPlayer player, CSUser user )
		{
			if ( !room.RemovePlayer( player ) )
				return;

			user.IsInRoom = false;
			user.roomID = 0;

			Logger.Log( $"user:{user.gcNID} leave room:{room.id}" );

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
			//todo 现在先随机一张地图
			Random rnd = new Random();
			int mapCount = Defs.GetMapCount();
			room.mapID = rnd.Next( 0, mapCount );
			room.maxPlayers = Defs.GetMap( room.mapID ).GetInt( "max_players" );
			Logger.Log( $"room:{room.id} was created" );
			this._freeRooms.Add( room );
			this._idToRoom[room.id] = room;
			return room;
		}

		private void DestroyRoom( Room room, int type )
		{
			//移除房间内所有玩家
			int count = room.numPlayers;
			for ( int i = 0; i < count; i++ )
			{
				RoomPlayer player = room.GetPlayerAt( i );
				CSUser user = CS.instance.userMgr.GetUser( player.gcNID );
				room.RemovePlayerAt( i );
				user.IsInRoom = false;
				user.roomID = 0;
				Logger.Log( $"user:{user.gcNID} leave room:{room.id}" );
				--i;
				--count;
			}

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
			return null;
		}

		/// <summary>
		/// 处理玩家开始匹配
		/// </summary>
		public void BeginMatch( uint sid, Protos.GC2CS_BeginMatch beginMatch )
		{
			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );

			ulong gcNID = beginMatch.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"invalid user:{gcNID}" );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.IllegalId;
				CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			if ( user.state == CSUser.State.Battle )
			{
				Logger.Warn( $"user:{gcNID} in battle" );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.UserInBattle;
				CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			if ( user.IsInRoom )
			{
				Logger.Warn( $"user:{gcNID} in room" );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.UserInRoom;
				CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			//加入或创建房间
			Room room = this.JoinRoom();
			if ( room == null )
			{
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.NoRoom;
				CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			ret.Id = room.id;
			ret.MapID = room.mapID;
			ret.MaxPlayer = room.maxPlayers;
			this.FillProtoPlayerInfo( room, ret.PlayerInfos );

			RoomPlayer player = new RoomPlayer( gcNID, user.ukey );
			player.actorID = beginMatch.ActorID;
			//按照匹配模式进行队伍分配
			switch ( beginMatch.Mode )
			{
				case Protos.GC2CS_BeginMatch.Types.EMode.Single1V1:
					player.team = room.numPlayers == 0 ? 0 : 1;
					break;
				default:
					throw new NotSupportedException();
			}

			if ( !room.CanAddPlayer( player ) )
			{
				//加入失败,如果房间没玩家,则销毁房间
				if ( room.isEmpty )
					this.DestroyRoom( room, 99 );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.Failed;
				CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.Success;
			//发送回应
			CS.instance.netSessionMgr.Send( sid, ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );

			this.AddPlayer( room, player, user );

			if ( room.isFull )
			{
				room.started = true;
				this._freeRooms.Remove( room );
				this._fullRooms.Add( room );
			}
		}

		/// <summary>
		/// 处理玩家提交的信息
		/// </summary>
		public void UpdatePlayerInfo( Protos.GC2CS_UpdatePlayerInfo updatePlayerInfo )
		{
			ulong gcNID = updatePlayerInfo.Opts.Transid;

			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"invalid user:{gcNID}" );
				return;
			}

			if ( !user.IsInRoom || !this._idToRoom.TryGetValue( user.roomID, out Room room ) ||
				 !room.HasPlayer( gcNID ) )
			{
				Logger.Warn( $"user:{gcNID} not in room" );
				return;
			}
			RoomPlayer player = room.GetPlayer( gcNID );
			player.progress = updatePlayerInfo.Progress;
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
				RoomPlayer player = room.GetPlayerAt( i );
				roomInfo.Progresses.Add( player.progress );
			}
			this.Broadcast( room, roomInfo );
		}

		/// <summary>
		/// 匹配完成,载入完成,发送BS信息
		/// </summary>
		private void BeginBattle( Room room )
		{
			BSInfo appropriateBSInfo = CS.instance.appropriateBSInfo;
			//没有找到合适的bs,通知客户端匹配失败
			if ( appropriateBSInfo == null )
			{
				this.NotifyGCEnterBattleFailed( room, Protos.CS2GC_EnterBattle.Types.Error.BsnotFound );
				this.DestroyRoom( room, 1 );
				return;
			}

			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.MapID = room.mapID;
			battleInfo.ConnTimeout = ( int ) Consts.WAITING_ROOM_TIME_OUT;
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				RoomPlayer player = room.GetPlayerAt( i );
				CSUser user = CS.instance.userMgr.GetUser( player.gcNID );
				Protos.CS2BS_PlayerInfo pi = new Protos.CS2BS_PlayerInfo
				{
					GcNID = player.ukey | ( ulong ) appropriateBSInfo.lid << 32,
					Name = user.name,
					ActorID = player.actorID,
					Team = player.team
				};
				battleInfo.PlayerInfo.Add( pi );
			}
			//通知BS创建战场
			CS.instance.netSessionMgr.Send( appropriateBSInfo.sessionID, battleInfo, msg =>
				 {
					 //BS战场创建完成了

					 //避免在消息发送期间,BS可能发生意外丢失,这里需要再检查一次
					 if ( !CS.instance.lIDToBSInfos.ContainsKey( appropriateBSInfo.lid ) )
						 this.NotifyGCEnterBattleFailed( room, Protos.CS2GC_EnterBattle.Types.Error.Bslost );
					 else
					 {
						 Protos.BS2CS_BattleInfoRet battleInfoRet = ( Protos.BS2CS_BattleInfoRet ) msg;
						 if ( battleInfoRet.Result != Protos.Global.Types.ECommon.Success )
							 this.NotifyGCEnterBattleFailed( room, Protos.CS2GC_EnterBattle.Types.Error.BattleCreateFailed );
						 else
						 {
							 //把玩家移动到战场暂存器里
							 int count = room.numPlayers;
							 for ( int i = 0; i < count; i++ )
							 {
								 RoomPlayer player = room.GetPlayerAt( i );
								 CSUser user = CS.instance.userMgr.GetUser( player.ukey );
								 //把房间ID和玩家在BS上的网络ID联系起来,以便在战场结束后迅速找到玩家
								 CS.instance.battleStaging.Add( appropriateBSInfo.lid, appropriateBSInfo.sessionID,
																battleInfoRet.Bid, user );
							 }

							 //广播给玩家
							 Protos.CS2GC_EnterBattle enterBattle = ProtoCreator.Q_CS2GC_EnterBattle();
							 enterBattle.Ip = appropriateBSInfo.ip;
							 enterBattle.Port = appropriateBSInfo.port;
							 this.Broadcast( room, enterBattle, 0, ( m, player ) =>
						 {
							 Protos.CS2GC_EnterBattle m2 = ( Protos.CS2GC_EnterBattle ) m;
							 m2.GcNID = player.ukey | ( ulong ) appropriateBSInfo.lid << 32;
						 } );
						 }
					 }
					 this.DestroyRoom( room, 1 );
				 } );
		}

		private void NotifyGCEnterBattleFailed( Room room, Protos.CS2GC_EnterBattle.Types.Error error )
		{
			Protos.CS2GC_EnterBattle bsInfo = ProtoCreator.Q_CS2GC_EnterBattle();
			bsInfo.Error = error;
			this.Broadcast( room, bsInfo );
		}

		private void FillProtoPlayerInfo( Room room, Google.Protobuf.Collections.RepeatedField<Protos.CS2GC_PlayerInfo> repeatedField )
		{
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				RoomPlayer player = room.GetPlayerAt( i );
				Protos.CS2GC_PlayerInfo pi = new Protos.CS2GC_PlayerInfo();
				pi.GcNID = player.gcNID;
				pi.Name = CS.instance.userMgr.GetUser( player.gcNID ).name;
				pi.ActorID = player.actorID;
				pi.Team = player.team;
				repeatedField.Add( pi );
			}
		}

		private void Broadcast( Room room, IMessage msg, ulong gcNID = 0, Action<IMessage, RoomPlayer> msgModifier = null )
		{
			for ( int i = 0; i < room.numPlayers; ++i )
			{
				RoomPlayer player = room.GetPlayerAt( i );
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