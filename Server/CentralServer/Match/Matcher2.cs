﻿using CentralServer.User;
using Core.Misc;
using Google.Protobuf;
using Shared;
using Shared.Battle;
using Shared.Net;
using System;
using System.Collections.Generic;
using BSInfo = Shared.BSInfo;

namespace CentralServer.Match
{
	public class Matcher2
	{
		private static readonly ObjectPool<Room> POOL = new ObjectPool<Room>( 50, 20 );

		/// <summary>
		/// 等待玩家进入的房间
		/// </summary>
		private readonly List<Room> _openRooms = new List<Room>();
		/// <summary>
		/// 房间ID对应的房间实例
		/// </summary>
		private readonly Dictionary<uint, Room> _idToRoom = new Dictionary<uint, Room>();
		/// <summary>
		/// 玩家到房间的映射
		/// </summary>
		private readonly Dictionary<CSUser, Room> _userToRoom = new Dictionary<CSUser, Room>();

		public int numOpenRooms => this._openRooms.Count;

		/// <summary>
		/// 检查玩家是否在房间
		/// </summary>
		public bool ContainsUser( CSUser user ) => this._userToRoom.ContainsKey( user );

		/// <summary>
		/// 强制把指定ID玩家踢除
		/// </summary>
		public void OnUserKicked( CSUser user )
		{
			//有可能玩家不在房间里
			if ( !this._userToRoom.TryGetValue( user, out Room room ) )
				return;
			this.RemovePlayer( room, room.GetPlayer( user ), user );
		}

		/// <summary>
		/// 添加玩家
		/// 调用此方法前先确保是否能添加玩家
		/// </summary>
		private void AddPlayer( Room room, RoomPlayer player, CSUser user )
		{
			room.AddPlayer( player );
			this._userToRoom[user] = room;

			Logger.Log( $"user:{user.gcNID} join room:{room.id}" );

			//通知GC有玩家加入房间
			Protos.CS2GC_PlayerJoin playerJoin = ProtoCreator.Q_CS2GC_PlayerJoin();
			playerJoin.PlayerInfo = new Protos.CS2GC_PlayerInfo
			{
				GcNID = player.user.gcNID,
				Nickname = player.user.nickname,
				Avatar = player.user.avatar,
				Gender = player.user.gender,
				//todo
				Honor = 0,
				ActorID = player.actorID,
				Team = player.team
			};
			Broadcast( room, playerJoin );
		}

		/// <summary>
		/// 移除玩家
		/// 调用前确保玩家在房间内
		/// </summary>
		private void RemovePlayer( Room room, RoomPlayer player, CSUser user )
		{
			room.RemovePlayer( player );
			this._userToRoom.Remove( user );
			Logger.Log( $"user:{user.gcNID} leave room:{room.id}" );

			//通知gc有玩家离开房间
			Protos.CS2GC_PlayerLeave playerLeave = ProtoCreator.Q_CS2GC_PlayerLeave();
			playerLeave.GcNID = player.user.gcNID;
			Broadcast( room, playerLeave );

			if ( room.isEmpty )
				this.DestroyRoom( room );
		}

		/// <summary>
		/// 加入房间
		/// </summary>
		private Room JoinRoom()
		{
			Room room;
			if ( this._openRooms.Count > 0 )
			{
				//todo 现在随机加入房间
				Random rnd = new Random();
				room = this._openRooms[rnd.Next( 0, this._openRooms.Count )];
			}
			else
				room = this.CreateRoom();
			return room;
		}

		/// <summary>
		/// 创建房间
		/// </summary>
		private Room CreateRoom()
		{
			Room room = POOL.Pop();
			//todo 现在先随机一张地图
			Random rnd = new Random();
			int mapCount = Defs.GetMapCount();
			room.mapID = rnd.Next( 0, mapCount );
			room.maxPlayers = Defs.GetMap( room.mapID ).GetInt( "max_players" );
			Logger.Log( $"room:{room.id} was created" );
			this._openRooms.Add( room );
			this._idToRoom[room.id] = room;
			return room;
		}

		/// <summary>
		/// 销毁房间
		/// </summary>
		/// <param name="room"></param>
		private void DestroyRoom( Room room )
		{
			//移除房间内所有玩家
			int count = room.numPlayers;
			for ( int i = 0; i < count; i++ )
			{
				RoomPlayer player = room.GetPlayerAt( i );
				room.RemovePlayerAt( i );
				this._userToRoom.Remove( player.user );
				Logger.Log( $"user:{player.user.gcNID} leave room:{room.id}" );
				--i;
				--count;
			}

			this._idToRoom.Remove( room.id );
			this._openRooms.Remove( room );

			POOL.Push( room );
			Logger.Log( $"room:{room.id} was destroied" );
		}

		/// <summary>
		/// 处理玩家开始匹配
		/// </summary>
		public void BeginMatch( NetSessionBase session, Protos.GC2CS_BeginMatch beginMatch )
		{
			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );

			ulong gcNID = beginMatch.Opts.Transid;
			CSUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"invalid user:{gcNID}" );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.IllegalId;
				session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			if ( user.isInBattle )
			{
				Logger.Warn( $"user:{gcNID} in battle" );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.UserInBattle;
				session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			if ( this.ContainsUser( user ) )
			{
				Logger.Warn( $"user:{gcNID} in room" );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.UserInRoom;
				session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			//加入或创建房间
			Room room = this.JoinRoom();
			if ( room == null )
			{
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.NoRoom;
				session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			//判断房间是否能加入该玩家
			if ( !room.CanAddUser( user.gcNID ) )
			{
				//加入失败,如果房间没玩家,则销毁房间
				if ( room.isEmpty )
					this.DestroyRoom( room );
				ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.Failed;
				session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				return;
			}

			//判断模式是否被支持
			switch ( beginMatch.Mode )
			{
				case Protos.GC2CS_BeginMatch.Types.EMode.Single1V1:
				case Protos.GC2CS_BeginMatch.Types.EMode.Single2V2:
				case Protos.GC2CS_BeginMatch.Types.EMode.Team2V2:
					break;
				default:
					ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.Failed;
					session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
					return;
			}

			ret.Id = room.id;
			ret.MapID = room.mapID;
			ret.MaxPlayer = room.maxPlayers;
			ret.Result = Protos.CS2GC_BeginMatchRet.Types.EResult.Success;
			//注意在AddPlayer前填充消息,否则会把自己的信息也下发到客户端
			this.FillProtoPlayerInfo( room, ret.PlayerInfos );
			//发送回应
			session.Send( ret, null, Protos.MsgOpts.Types.TransTarget.Gc, gcNID );

			RoomPlayer player = new RoomPlayer( user );
			player.actorID = beginMatch.ActorID;
			//按照匹配模式进行队伍分配
			switch ( beginMatch.Mode )
			{
				case Protos.GC2CS_BeginMatch.Types.EMode.Single1V1:
					player.team = room.numPlayers == 0 ? 0 : 1;
					break;
			}
			//加入并通知GC
			this.AddPlayer( room, player, user );

			if ( room.isFull )
				this.BeginBattle( room );
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
				NotifyGCEnterBattleFailed( room, Protos.CS2GC_EnterBattle.Types.Result.BsnotFound );
				this.DestroyRoom( room );
				return;
			}

			//从等待房间队列中移除,避免在通信期间有玩家搜索到该房间
			Room roomCloned = room.Clone();
			this.DestroyRoom( room );

			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.MapID = roomCloned.mapID;
			battleInfo.ConnTimeout = ( int )Consts.WAITING_ROOM_TIME_OUT;
			for ( int i = 0; i < roomCloned.numPlayers; i++ )
			{
				RoomPlayer player = roomCloned.GetPlayerAt( i );
				Protos.CS2BS_PlayerInfo pi = new Protos.CS2BS_PlayerInfo
				{
					GcNID = player.user.ukey | ( ulong )appropriateBSInfo.lid << 32,
					Nickname = player.user.nickname,
					Avatar = player.user.avatar,
					Gender = player.user.gender,
					Money = player.user.money,
					Diamoned = player.user.diamoned,
					Honor = player.user.honor,
					ActorID = player.actorID,
					Team = player.team
				};
				battleInfo.PlayerInfos.Add( pi );
			}
			CS.instance.netSessionMgr.Send( appropriateBSInfo.sessionID, battleInfo, RPCEntry.Pop( OnBattleInfoRet, roomCloned,
																			 appropriateBSInfo.ip, appropriateBSInfo.port,
																			 appropriateBSInfo.sessionID, appropriateBSInfo.lid ) );
		}

		/// <summary>
		/// 处理回应
		/// </summary>
		private static void OnBattleInfoRet( NetSessionBase session_, IMessage ret, object[] args )
		{
			Room roomCloned = ( Room )args[0];
			string bsIP = ( string )args[1];
			int bsPort = ( int )args[2];
			uint bsSID = ( uint )args[3];
			uint bsLID = ( uint )args[4];

			Protos.BS2CS_BattleInfoRet battleInfoRet = ( Protos.BS2CS_BattleInfoRet )ret;
			//检查是否成功创建战场
			if ( battleInfoRet.Result != Protos.Global.Types.ECommon.Success )
			{
				NotifyGCEnterBattleFailed( roomCloned, Protos.CS2GC_EnterBattle.Types.Result.BattleCreateFailed );
				return;
			}

			Logger.Log( $"battle:{battleInfoRet.Bid} created" );

			CS.instance.battleStaging.OnBattleCreated( bsLID, battleInfoRet.Bid );

			//把所有玩家移动到战场暂存器里
			for ( int i = 0; i < roomCloned.numPlayers; ++i )
			{
				RoomPlayer player = roomCloned.GetPlayerAt( i );
				CS.instance.battleStaging.Add( player.user, bsLID, bsSID, battleInfoRet.Bid );
			}

			//广播给玩家
			Protos.CS2GC_EnterBattle enterBattle = ProtoCreator.Q_CS2GC_EnterBattle();
			enterBattle.Ip = bsIP;
			enterBattle.Port = bsPort;
			for ( int i = 0; i < roomCloned.numPlayers; ++i )
			{
				RoomPlayer player = roomCloned.GetPlayerAt( i );
				enterBattle.GcNID = player.user.ukey | ( ulong )bsLID << 32;
				player.user.Send( enterBattle );
			}
		}

		private static void NotifyGCEnterBattleFailed( Room room, Protos.CS2GC_EnterBattle.Types.Result result )
		{
			Protos.CS2GC_EnterBattle bsInfo = ProtoCreator.Q_CS2GC_EnterBattle();
			bsInfo.Result = result;
			Broadcast( room, bsInfo );
		}

		private void FillProtoPlayerInfo( Room room, Google.Protobuf.Collections.RepeatedField<Protos.CS2GC_PlayerInfo> repeatedField )
		{
			for ( int i = 0; i < room.numPlayers; i++ )
			{
				RoomPlayer player = room.GetPlayerAt( i );
				Protos.CS2GC_PlayerInfo pi = new Protos.CS2GC_PlayerInfo();
				pi.GcNID = player.user.gcNID;
				pi.Nickname = player.user.nickname;
				pi.Avatar = player.user.avatar;
				pi.Gender = player.user.gender;
				//todo
				pi.Honor = 0;
				pi.ActorID = player.actorID;
				pi.Team = player.team;
				repeatedField.Add( pi );
			}
		}

		/// <summary>
		/// 广播消息
		/// </summary>
		private static void Broadcast( Room room, IMessage msg )
		{
			//预编码的消息广播不支持转发
			for ( int i = 0; i < room.numPlayers; ++i )
			{
				RoomPlayer player = room.GetPlayerAt( i );
				player.user.Send( msg );
			}
		}
	}
}