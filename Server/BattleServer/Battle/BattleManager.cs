using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.Misc;
using Shared;
using Shared.Net;
using System;
using System.Collections.Generic;

namespace BattleServer.Battle
{
	public class BattleManager
	{
		private static readonly ObjectPool<Battle> POOL = new ObjectPool<Battle>();

		/// <summary>
		/// 战场随机种子产生器
		/// </summary>
		private readonly Random _random = new Random();
		/// <summary>
		/// 客户端网络ID到战场的映射表
		/// </summary>
		private readonly Dictionary<ulong, Battle> _gcNIDToBattle = new Dictionary<ulong, Battle>();
		/// <summary>
		/// 运行中的战场列表
		/// </summary>
		private readonly List<Battle> _runningBattles = new List<Battle>();

		/// <summary>
		/// 检查是否存在指定ID的客户端
		/// </summary>
		public bool IsInBattle( ulong gcNID ) => this._gcNIDToBattle.ContainsKey( gcNID );

		/// <summary>
		/// 获取指定ID玩家所在的战场
		/// </summary>
		public Battle GetBattle( ulong gcNID )
		{
			this._gcNIDToBattle.TryGetValue( gcNID, out Battle battle );
			return battle;
		}

		/// <summary>
		/// 开始战斗
		/// </summary>
		public ErrorCode CreateBattle( Protos.CS2BS_BattleInfo battleInfo, out uint bid )
		{
			Battle battle = POOL.Pop();
			bid = battle.id;

			//初始化战场描述
			BattleEntry battleEntry;
			battleEntry.rndSeed = this._random.Next();
			battleEntry.mapID = battleInfo.MapID;
			int count = battleInfo.PlayerInfo.Count;
			battleEntry.players = new BattleEntry.Player[count];
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2BS_PlayerInfo playerInfo = battleInfo.PlayerInfo[i];
				BattleEntry.Player player = new BattleEntry.Player
				{
					gcNID = playerInfo.GcNID,
					actorID = playerInfo.ActorID,
					name = playerInfo.Name,
					team = playerInfo.Team
				};
				battleEntry.players[i] = player;

				this._gcNIDToBattle[playerInfo.GcNID] = battle;
			}

			//初始化战场
			if ( !battle.Init( battleEntry ) )
			{
				POOL.Push( battle );
				return ErrorCode.Failed;
			}
			this._runningBattles.Add( battle );

			Logger.Log( $"battle:{battle.id} created" );

			//Protos.BS2CS_BattleStart toCSBattleStart = ProtoCreator.Q_BS2CS_BattleStart();
			//toCSBattleStart.Bid = battle.id;
			//BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, toCSBattleStart, msgRet =>
			//{
			//	//通知GC战场开始
			//	Protos.BS2GC_BattleStart toGCBattleStart = ProtoCreator.Q_BS2GC_BattleStart();
			//	toGCBattleStart.Id = battle.id;
			//	battle.Broadcast( toGCBattleStart );
			//} );
			return ErrorCode.Success;
		}

		private void OnBattleEnd( Battle battle )
		{
			//通知CS战场结束
			Protos.BS2CS_BattleEnd toCSBattleEnd = ProtoCreator.Q_BS2CS_BattleEnd();
			toCSBattleEnd.Bid = battle.id;
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, toCSBattleEnd, msgRet =>
			{
				//通知客户端战场结束
				Protos.BS2GC_BattleEnd toGCBattleEnd = ProtoCreator.Q_BS2GC_BattleEnd();
				toGCBattleEnd.Id = battle.id;
				battle.Broadcast( toGCBattleEnd );
				//所有玩家下线
				int count = battle.numPlayers;
				for ( int i = 0; i < count; i++ )
					BS.instance.userMgr.Offline( battle.GetPlayerAt( i ).user );
			} );
		}

		public void Update( long dt )
		{
			int count = this._runningBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._runningBattles[i];
				//检查战场是否结束
				if ( battle.finished )
				{
					//处理战场结束
					this.OnBattleEnd( battle );
					battle.End();
					this._runningBattles.RemoveAt( i );
					POOL.Push( battle );
					Logger.Log( $"battle:{battle.id} destroied" );
					--i;
					--count;
				}
			}
		}

		/// <summary>
		/// 玩家建立连接时调用
		/// </summary>
		internal void OnUserConnected( BSUser user )
		{
			Battle battle = BS.instance.battleManager.GetBattle( user.gcNID );
			int count = battle.numPlayers;
			for ( var i = 0; i < count; i++ )
			{
				Player player = battle.GetPlayerAt( i );
				if ( player.id != user.gcNID )
					continue;
				player.user = user;
				return;
			}
		}

		/// <summary>
		/// 玩家失去连接时调用
		/// </summary>
		internal void OnUserDisconnected( BSUser user )
		{
			Battle battle = BS.instance.battleManager.GetBattle( user.gcNID );
			int count = battle.numPlayers;
			for ( var i = 0; i < count; i++ )
			{
				Player player = battle.GetPlayerAt( i );
				if ( player.user != user )
					continue;
				player.user = null;
				return;
			}
		}

		/// <summary>
		/// 玩家请求获取当前战场快照
		/// </summary>
		internal void OnRequestSnapshot( ulong gcNID, Protos.GC2BS_RequestSnapshot request )
		{
			Protos.BS2GC_RequestSnapshotRet ret = ProtoCreator.R_GC2BS_RequestSnapshot( request.Opts.Pid );
			BSUser user = BS.instance.userMgr.GetUser( gcNID );
			do
			{
				Battle battle = this.GetBattle( gcNID );
				if ( battle == null )
				{
					ret.Result = Protos.BS2GC_RequestSnapshotRet.Types.EResult.InvalidBattle;
					break;
				}
				FrameSnapshot snapshot = battle.GetSnapshot( request.Frame );
				ret.ReqFrame = request.Frame;
				ret.CurFrame = battle.frame;
				ret.Snapshot = snapshot.data;
			} while ( false );
			user.Send( ret );
		}
	}
}