using CentralServer.User;
using Core.Misc;
using Shared;
using Shared.Net;
using System;

namespace CentralServer
{
	public class BattleUser
	{
		/// <summary>
		/// 玩家ID
		/// </summary>
		public ulong id { get; }

		public BattleUser( ulong id )
		{
			this.id = id;
		}

		public virtual string Dump() => $"id:{this.id}";
	}

	public class BattleEntry
	{

		public void BeginBattle( BattleUser[] users, BattleUser[][] tUsers )
		{
			BSInfo appropriateBSInfo = CS.instance.appropriateBSInfo;
			//没有找到合适的bs,通知客户端匹配失败
			if ( appropriateBSInfo == null )
			{
				this.NotifyGCEnterBattleFailed( users, Protos.CS2GC_EnterBattle.Types.Result.BsnotFound );
				return;
			}

			//todo 现在先随机一张地图
			Random rnd = new Random();
			int mapCount = Defs.GetMapCount();
			int mapID = rnd.Next( 0, mapCount );

			Protos.CS2BS_BattleInfo battleInfo = ProtoCreator.Q_CS2BS_BattleInfo();
			battleInfo.MapID = mapID;
			battleInfo.ConnTimeout = ( int )Consts.WAITING_ROOM_TIME_OUT;
			int c1 = tUsers.Length;
			for ( int i = 0; i < c1; i++ )
			{
				Protos.CS2BS_TeamInfo ti = new Protos.CS2BS_TeamInfo();
				battleInfo.TeamInfos.Add( ti );
				BattleUser[] roomUsers = tUsers[i];
				int c2 = roomUsers.Length;
				for ( int j = 0; j < c2; j++ )
				{
					BattleUser roomUser = roomUsers[j];
					CSUser user = CS.instance.userMgr.GetUser( roomUser.id );
					Protos.CS2BS_PlayerInfo pi = new Protos.CS2BS_PlayerInfo
					{
						GcNID = user.ukey | ( ulong )appropriateBSInfo.lid << 32,
						ActorID = user.actorID,
						Avatar = user.avatar,
						Nickname = user.nickname,
						Gender = user.gender,
						Money = user.money,
						Diamoned = user.diamoned,
						Rank = user.rank,
						Exp = user.exp
					};
					ti.PlayerInfos.Add( pi );
				}
			}
			CS.instance.netSessionMgr.Send( appropriateBSInfo.sessionID, battleInfo, RPCEntry.Pop( this.OnBattleInfoRet, users, tUsers,
																								   appropriateBSInfo.ip, appropriateBSInfo.port,
																								   appropriateBSInfo.sessionID, appropriateBSInfo.lid ) );
		}

		/// <summary>
		/// 处理回应
		/// </summary>
		private void OnBattleInfoRet( NetSessionBase session_, Google.Protobuf.IMessage ret, object[] args )
		{
			BattleUser[] users = ( BattleUser[] )args[0];
			BattleUser[][] tUsers = ( BattleUser[][] )args[1];
			string bsIP = ( string )args[2];
			int bsPort = ( int )args[3];
			uint bsSID = ( uint )args[4];
			uint bsLID = ( uint )args[5];

			Protos.BS2CS_BattleInfoRet battleInfoRet = ( Protos.BS2CS_BattleInfoRet )ret;
			//检查是否成功创建战场
			if ( battleInfoRet.Result != Protos.Global.Types.ECommon.Success )
			{
				this.NotifyGCEnterBattleFailed( users, Protos.CS2GC_EnterBattle.Types.Result.BattleCreateFailed );
				return;
			}

			Logger.Log( $"battle:{battleInfoRet.Bid} created" );

			CS.instance.battleStaging.OnBattleCreated( bsLID, battleInfoRet.Bid );

			//把所有玩家移动到战场暂存器里
			int count = users.Length;
			for ( int i = 0; i < count; i++ )
			{
				BattleUser matchUser = users[i];
				CSUser user = CS.instance.userMgr.GetUser( matchUser.id );
				CS.instance.battleStaging.Add( user, bsLID, bsSID, battleInfoRet.Bid );
			}

			//广播给玩家
			Protos.CS2GC_EnterBattle enterBattle = ProtoCreator.Q_CS2GC_EnterBattle();
			enterBattle.Ip = bsIP;
			enterBattle.Port = bsPort;
			for ( int i = 0; i < count; i++ )
			{
				BattleUser matchUser = users[i];
				CSUser user = CS.instance.userMgr.GetUser( matchUser.id );
				enterBattle.GcNID = user.ukey | ( ulong )bsLID << 32;
				user.Send( enterBattle );
			}
		}

		private void NotifyGCEnterBattleFailed( BattleUser[] users, Protos.CS2GC_EnterBattle.Types.Result result )
		{
			Protos.CS2GC_EnterBattle bsInfo = ProtoCreator.Q_CS2GC_EnterBattle();
			bsInfo.Result = result;
			this.Broadcast( users, bsInfo );
		}

		/// <summary>
		/// 广播消息
		/// </summary>
		public void Broadcast( BattleUser[] users, Google.Protobuf.IMessage msg )
		{
			//预编码的消息广播不支持转发
			foreach ( BattleUser user in users )
			{
				if ( user != null )
					CS.instance.userMgr.GetUser( user.id )?.Send( msg );
			}
		}
	}
}
