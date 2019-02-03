using CentralServer.User;
using Core.Misc;
using Shared;
using Shared.Battle;
using Shared.Net;
using System;
using System.Collections;
using System.Collections.Generic;
using BSInfo = Shared.BSInfo;

namespace CentralServer.Match
{
	public class MatchManager
	{
		private readonly Dictionary<byte, MatchSystem> _matchingSystems = new Dictionary<byte, MatchSystem>();
		private readonly Dictionary<CSUser, MatchUser> _userToMatchUser = new Dictionary<CSUser, MatchUser>();
		private readonly Dictionary<MatchUser, CSUser> _matchUserToUser = new Dictionary<MatchUser, CSUser>();
		private readonly HashSet<MatchUser> _userToRemove = new HashSet<MatchUser>();

		internal void InitFromDefs( Hashtable json )
		{
			Hashtable[] defs = json.GetMapArray( "instances" );
			foreach ( Hashtable def in defs )
			{
				MatchSystem matchSystem = new MatchSystem();
				matchSystem.InitFromDefs( def );
				matchSystem.onMatchResult += this.OnMatchResult;
				matchSystem.OnUserStateChanged += this.OnUserStateChanged;
				this._matchingSystems[matchSystem.mode] = matchSystem;
			}
		}

		internal void OnHeartBeat( long dt )
		{
			foreach ( var kv in this._matchingSystems )
				kv.Value.Update( dt );
		}

		private void OnMatchResult( MatchTeam team )
		{
			this.BeginBattle( team );
		}

		private void OnUserStateChanged( MatchUserEvent e )
		{
			MatchUser matchUser = e.user;
			if ( this._userToRemove.Contains( matchUser ) )
			{
				CSUser user = this._matchUserToUser[matchUser];
				this._matchUserToUser.Remove( matchUser );
				this._userToMatchUser.Remove( user );
				this._userToRemove.Remove( matchUser );
			}
		}

		/// <summary>
		/// 创建匹配玩家
		/// </summary>
		/// <param name="mode">模式(高4位代表队伍数量,低4位代表每个队伍的玩家数量)</param>
		/// <param name="user">玩家实例</param>
		/// <param name="matchParams">匹配参数</param>
		/// <returns>是否创建成功</returns>
		internal bool CreateUser( Protos.GC2CS_BeginMatch.Types.EMode mode, CSUser user, MatchParams matchParams )
		{
			if ( this._userToMatchUser.ContainsKey( user ) )
				return false;
			byte mode2;
			switch ( mode )
			{
				case Protos.GC2CS_BeginMatch.Types.EMode.T2P2:
					mode2 = 34;
					break;
				default:
					mode2 = 33;
					break;
			}
			this._matchingSystems.TryGetValue( mode2, out MatchSystem matchingSystem );
			MatchUser matchUser = matchingSystem?.CreateUser( user.gcNID, user.honor );
			if ( matchUser == null )
				return false;
			matchUser.userdata = matchParams;
			this._userToMatchUser[user] = matchUser;
			this._matchUserToUser[matchUser] = user;
			return true;
		}

		/// <summary>
		/// 移除匹配玩家
		/// </summary>
		internal bool RemoveUser( CSUser user )
		{
			if ( !this._userToMatchUser.TryGetValue( user, out MatchUser matchUser ) )
				return false;
			this._userToRemove.Add( matchUser );
			matchUser.grading.system.RemoveUser( matchUser );
			return true;
		}

		private void BeginBattle( MatchTeam team )
		{
			BSInfo appropriateBSInfo = CS.instance.appropriateBSInfo;
			//没有找到合适的bs,通知客户端匹配失败
			if ( appropriateBSInfo == null )
			{
				this.NotifyGCEnterBattleFailed( team, Protos.CS2GC_EnterBattle.Types.Result.BsnotFound );
				return;
			}

			//todo 现在先随机一张地图
			Random rnd = new Random();
			int mapCount = Defs.GetMapCount();
			int mapID = rnd.Next( 0, mapCount );

			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.MapID = mapID;
			battleInfo.ConnTimeout = ( int )Consts.WAITING_ROOM_TIME_OUT;
			int c0 = team.users.Length;
			for ( int i = 0; i < c0; i++ )
			{
				MatchUser[] users0 = team.users[i];
				int c1 = users0.Length;
				for ( int j = 0; j < c1; j++ )
				{
					MatchUser matchUser = users0[j];
					MatchParams matchParams = ( MatchParams )matchUser.userdata;
					CSUser user = CS.instance.userMgr.GetUser( matchUser.id );
					Protos.CS2BS_PlayerInfo pi = new Protos.CS2BS_PlayerInfo
					{
						GcNID = user.ukey | ( ulong )appropriateBSInfo.lid << 32,
						Nickname = user.nickname,
						Avatar = user.avatar,
						Gender = user.gender,
						Money = user.money,
						Diamoned = user.diamoned,
						Honor = user.honor,
						ActorID = matchParams.actorID,
						Team = i
					};
					battleInfo.PlayerInfos.Add( pi );
				}
			}

			CS.instance.netSessionMgr.Send( appropriateBSInfo.sessionID, battleInfo, RPCEntry.Pop( this.OnBattleInfoRet, team,
																								   appropriateBSInfo.ip, appropriateBSInfo.port,
																								   appropriateBSInfo.sessionID, appropriateBSInfo.lid ) );
		}

		/// <summary>
		/// 处理回应
		/// </summary>
		private void OnBattleInfoRet( NetSessionBase session_, Google.Protobuf.IMessage ret, object[] args )
		{
			MatchTeam team = ( MatchTeam )args[0];
			string bsIP = ( string )args[1];
			int bsPort = ( int )args[2];
			uint bsSID = ( uint )args[3];
			uint bsLID = ( uint )args[4];

			Protos.BS2CS_BattleInfoRet battleInfoRet = ( Protos.BS2CS_BattleInfoRet )ret;
			//检查是否成功创建战场
			if ( battleInfoRet.Result != Protos.Global.Types.ECommon.Success )
			{
				this.NotifyGCEnterBattleFailed( team, Protos.CS2GC_EnterBattle.Types.Result.BattleCreateFailed );
				return;
			}

			Logger.Log( $"battle:{battleInfoRet.Bid} created" );

			CS.instance.battleStaging.OnBattleCreated( bsLID, battleInfoRet.Bid );

			//把所有玩家移动到战场暂存器里
			foreach ( MatchUser[] users0 in team.users )
			{
				foreach ( MatchUser matchUser in users0 )
				{
					CSUser user = this._matchUserToUser[matchUser];
					CS.instance.battleStaging.Add( user, bsLID, bsSID, battleInfoRet.Bid );
				}
			}

			//广播给玩家
			Protos.CS2GC_EnterBattle enterBattle = ProtoCreator.Q_CS2GC_EnterBattle();
			enterBattle.Ip = bsIP;
			enterBattle.Port = bsPort;
			foreach ( MatchUser[] users0 in team.users )
			{
				foreach ( MatchUser matchUser in users0 )
				{
					CSUser user = this._matchUserToUser[matchUser];
					enterBattle.GcNID = user.ukey | ( ulong )bsLID << 32;
					user.Send( enterBattle );
				}
			}
		}

		private void NotifyGCEnterBattleFailed( MatchTeam team, Protos.CS2GC_EnterBattle.Types.Result result )
		{
			Protos.CS2GC_EnterBattle bsInfo = ProtoCreator.Q_CS2GC_EnterBattle();
			bsInfo.Result = result;
			this.Broadcast( team, bsInfo );
		}

		/// <summary>
		/// 广播消息
		/// </summary>
		private void Broadcast( MatchTeam team, Google.Protobuf.IMessage msg )
		{
			//预编码的消息广播不支持转发
			foreach ( MatchUser[] users0 in team.users )
				foreach ( MatchUser user in users0 )
					this._matchUserToUser[user].Send( msg );
		}
	}
}