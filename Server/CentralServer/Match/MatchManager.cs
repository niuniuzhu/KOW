using CentralServer.User;
using Core.Misc;
using Shared;
using Shared.Battle;
using Shared.Net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;

namespace CentralServer.Match
{
	public class MatchManager
	{
		private readonly Dictionary<byte, MatchSystem> _matchingSystems = new Dictionary<byte, MatchSystem>();
		private readonly Dictionary<ulong, RoomUser> _userIDToRoomUser = new Dictionary<ulong, RoomUser>();
		private readonly Stopwatch _sw = new Stopwatch();
		private long _maxElapsePerUpdate;

		private IEnumerator enumerator;

		public MatchManager()
		{
			this.enumerator = this.OnCoroutine();
		}

		public void InitFromDefs( Hashtable json )
		{
			Hashtable[] defs = json.GetMapArray( "instances" );
			this._maxElapsePerUpdate = json.GetInt( "max_elapse_per_update" );
			foreach ( Hashtable def in defs )
			{
				MatchSystem matchSystem = new MatchSystem();
				matchSystem.InitFromDefs( def );
				matchSystem.eventHandler += this.OnEvent;
				this._matchingSystems[matchSystem.mode] = matchSystem;
			}
		}

		internal void OnHeartBeat( long dt )
		{
			foreach ( var kv in this._matchingSystems )
				kv.Value.Update( dt );

			this._sw.Restart();
			if ( !this.enumerator.MoveNext() )
				this.enumerator = this.OnCoroutine();
		}

		private IEnumerator OnCoroutine()
		{
			foreach ( var kv in this._matchingSystems )
			{
				kv.Value.CheckRoom();
				if ( this._sw.ElapsedMilliseconds >= this._maxElapsePerUpdate )
				{
					this._sw.Stop();
					yield return 0;
				}
			}
		}

		private void OnEvent( MatchEvent.Type type, RoomUser sender, RoomInfo roomInfo )
		{
			switch ( type )
			{
				case MatchEvent.Type.AddToRoom:
					{
						Protos.CS2GC_AddToMatch response = ProtoCreator.Q_CS2GC_AddToMatch();
						CS.instance.userMgr.GetUser( sender.id ).Send( response );
					}
					break;

				case MatchEvent.Type.RemoveFromRoom:
					{
						Protos.CS2GC_RemoveFromMatch response = ProtoCreator.Q_CS2GC_RemoveFromMatch();
						CS.instance.userMgr.GetUser( sender.id ).Send( response );
					}
					break;

				case MatchEvent.Type.RoomInfo:
					{
						Protos.CS2GC_MatchState pMatchState = ProtoCreator.Q_CS2GC_MatchState();
						int c1 = roomInfo.tUsers.Length;
						for ( int i = 0; i < c1; i++ )
						{
							RoomUser[] roomUsers = roomInfo.tUsers[i];
							int c2 = roomUsers.Length;
							for ( int j = 0; j < c2; j++ )
							{
								RoomUser roomUser = roomUsers[j];
								if ( roomUser == null )
								{
									Protos.CS2GC_PlayerInfo playerInfo = new Protos.CS2GC_PlayerInfo
									{
										Vaild = false,
									};
									pMatchState.PlayerInfos.Add( playerInfo );
								}
								else
								{
									CSUser user = CS.instance.userMgr.GetUser( roomUser.id );
									MatchParams matchParams = ( MatchParams )roomUser.userdata;
									Protos.CS2GC_PlayerInfo playerInfo = new Protos.CS2GC_PlayerInfo
									{
										Vaild = true,
										GcNID = user.gcNID,
										Nickname = user.nickname,
										Avatar = user.avatar,
										Gender = user.gender,
										Rank = user.rank,
										Team = i,
										ActorID = matchParams.actorID
									};
									pMatchState.PlayerInfos.Add( playerInfo );
								}
							}
						}
						this.Broadcast( roomInfo.users, pMatchState );
					}
					break;

				case MatchEvent.Type.MatchSuccess:
					foreach ( RoomUser user in roomInfo.users )
						this._userIDToRoomUser.Remove( user.id );
					this.BeginBattle( roomInfo );
					break;
			}
		}

		internal bool Join( Protos.GC2CS_BeginMatch.Types.EMode mode, CSUser user, MatchParams matchParams )
		{
			if ( this._userIDToRoomUser.ContainsKey( user.gcNID ) )
				return false;

			byte mode2;
			switch ( mode )
			{
				case Protos.GC2CS_BeginMatch.Types.EMode.T1P1:
					mode2 = ( 1 << 4 ) | 1;
					break;

				case Protos.GC2CS_BeginMatch.Types.EMode.T2P1:
					mode2 = ( 2 << 4 ) | 1;
					break;

				case Protos.GC2CS_BeginMatch.Types.EMode.T2P2:
					mode2 = ( 2 << 4 ) | 2;
					break;

				default:
					Logger.Warn( $"not support mode:{mode}" );
					return false;
			}
			if ( !this._matchingSystems.TryGetValue( mode2, out MatchSystem matchingSystem ) )
				return false;
			RoomUser roomUser = new RoomUser( user.gcNID, user.rank ) { userdata = matchParams };
			if ( !matchingSystem.Join( roomUser ) )
				return false;
			this._userIDToRoomUser[user.gcNID] = roomUser;
			return true;
		}

		/// <summary>
		/// 移除匹配玩家
		/// </summary>
		internal bool Leave( CSUser user )
		{
			if ( !this._userIDToRoomUser.TryGetValue( user.gcNID, out RoomUser roomUser ) )
				return false;
			this._userIDToRoomUser.Remove( user.gcNID );
			return roomUser.room == null || roomUser.room.system.Leave( roomUser );
		}

		private void BeginBattle( RoomInfo roomInfo )
		{
			BSInfo appropriateBSInfo = CS.instance.appropriateBSInfo;
			//没有找到合适的bs,通知客户端匹配失败
			if ( appropriateBSInfo == null )
			{
				this.NotifyGCEnterBattleFailed( roomInfo.users, Protos.CS2GC_EnterBattle.Types.Result.BsnotFound );
				return;
			}

			//todo 现在先随机一张地图
			Random rnd = new Random();
			int mapCount = Defs.GetMapCount();
			int mapID = rnd.Next( 0, mapCount );

			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.MapID = mapID;
			battleInfo.ConnTimeout = ( int )Consts.WAITING_ROOM_TIME_OUT;
			int c1 = roomInfo.tUsers.Length;
			for ( int i = 0; i < c1; i++ )
			{
				RoomUser[] roomUsers = roomInfo.tUsers[i];
				int c2 = roomUsers.Length;
				for ( int j = 0; j < c2; j++ )
				{
					RoomUser roomUser = roomUsers[j];
					CSUser user = CS.instance.userMgr.GetUser( roomUser.id );
					MatchParams matchParams = ( MatchParams )roomUser.userdata;
					Protos.CS2BS_PlayerInfo pi = new Protos.CS2BS_PlayerInfo
					{
						GcNID = user.ukey | ( ulong )appropriateBSInfo.lid << 32,
						Nickname = user.nickname,
						Avatar = user.avatar,
						Gender = user.gender,
						Money = user.money,
						Diamoned = user.diamoned,
						Rank = user.rank,
						ActorID = matchParams.actorID,
						Team = i
					};
					battleInfo.PlayerInfos.Add( pi );
				}
			}
			CS.instance.netSessionMgr.Send( appropriateBSInfo.sessionID, battleInfo, RPCEntry.Pop( this.OnBattleInfoRet, roomInfo,
																								   appropriateBSInfo.ip, appropriateBSInfo.port,
																								   appropriateBSInfo.sessionID, appropriateBSInfo.lid ) );
		}

		/// <summary>
		/// 处理回应
		/// </summary>
		private void OnBattleInfoRet( NetSessionBase session_, Google.Protobuf.IMessage ret, object[] args )
		{
			RoomInfo roomInfo = ( RoomInfo )args[0];
			string bsIP = ( string )args[1];
			int bsPort = ( int )args[2];
			uint bsSID = ( uint )args[3];
			uint bsLID = ( uint )args[4];

			Protos.BS2CS_BattleInfoRet battleInfoRet = ( Protos.BS2CS_BattleInfoRet )ret;
			//检查是否成功创建战场
			if ( battleInfoRet.Result != Protos.Global.Types.ECommon.Success )
			{
				this.NotifyGCEnterBattleFailed( roomInfo.users, Protos.CS2GC_EnterBattle.Types.Result.BattleCreateFailed );
				return;
			}

			Logger.Log( $"battle:{battleInfoRet.Bid} created" );

			CS.instance.battleStaging.OnBattleCreated( bsLID, battleInfoRet.Bid );

			//把所有玩家移动到战场暂存器里
			int count = roomInfo.users.Length;
			for ( int i = 0; i < count; i++ )
			{
				RoomUser matchUser = roomInfo.users[i];
				CSUser user = CS.instance.userMgr.GetUser( matchUser.id );
				CS.instance.battleStaging.Add( user, bsLID, bsSID, battleInfoRet.Bid );
			}

			//广播给玩家
			Protos.CS2GC_EnterBattle enterBattle = ProtoCreator.Q_CS2GC_EnterBattle();
			enterBattle.Ip = bsIP;
			enterBattle.Port = bsPort;
			for ( int i = 0; i < count; i++ )
			{
				RoomUser matchUser = roomInfo.users[i];
				CSUser user = CS.instance.userMgr.GetUser( matchUser.id );
				enterBattle.GcNID = user.ukey | ( ulong )bsLID << 32;
				user.Send( enterBattle );
			}
		}

		private void NotifyGCEnterBattleFailed( RoomUser[] users, Protos.CS2GC_EnterBattle.Types.Result result )
		{
			Protos.CS2GC_EnterBattle bsInfo = ProtoCreator.Q_CS2GC_EnterBattle();
			bsInfo.Result = result;
			this.Broadcast( users, bsInfo );
		}

		/// <summary>
		/// 广播消息
		/// </summary>
		private void Broadcast( RoomUser[] users, Google.Protobuf.IMessage msg )
		{
			//预编码的消息广播不支持转发
			foreach ( RoomUser matchUser in users )
			{
				if ( matchUser != null )
					CS.instance.userMgr.GetUser( matchUser.id )?.Send( msg );
			}
		}
	}
}