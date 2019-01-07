using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.Misc;
using Shared;
using Shared.Net;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleServer.Battle
{
	public class BattleManager
	{
		private static readonly ObjectPool<Battle> POOL = new ObjectPool<Battle>( 50, 20 );

		/// <summary>
		/// 战场随机种子产生器
		/// </summary>
		private readonly Random _random = new Random();
		/// <summary>
		/// 运作中的战场列表
		/// </summary>
		private readonly List<Battle> _workingBattles = new List<Battle>();

		/// <summary>
		/// 获取战场数量
		/// </summary>
		public int numBattles => this._workingBattles.Count;

		/// <summary>
		/// 检查指定玩家ID所在的战场是否有效(存在?结束?)
		/// </summary>
		public Battle GetValidedBattle( ulong gcNID )
		{
			BSUser user = BS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return null;
			}
			Battle battle = user.battle;
			if ( battle.finished )
				return null;
			return battle;
		}

		/// <summary>
		/// 创建战场
		/// </summary>
		public ErrorCode CreateBattle( Protos.CS2BS_BattleInfo battleInfo, out uint bid )
		{
			bid = 0;
			//初始化战场描述
			BattleEntry battleEntry;
			battleEntry.rndSeed = this._random.Next();
			battleEntry.mapID = battleInfo.MapID;
			int count = battleInfo.PlayerInfos.Count;
			battleEntry.players = new BattleEntry.Player[count];
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2BS_PlayerInfo playerInfo = battleInfo.PlayerInfos[i];

				if ( BS.instance.userMgr.HasUser( playerInfo.GcNID ) )
					return ErrorCode.Failed;

				BattleEntry.Player player = new BattleEntry.Player
				{
					gcNID = playerInfo.GcNID,
					actorID = playerInfo.ActorID,
					name = playerInfo.Name,
					team = playerInfo.Team
				};
				battleEntry.players[i] = player;
			}

			//初始化战场
			Battle battle = POOL.Pop();
			bid = battle.id;
			if ( !battle.Init( battleEntry ) )
			{
				POOL.Push( battle );
				return ErrorCode.Failed;
			}

			//创建玩家
			count = battle.numPlayers;
			for ( int i = 0; i < count; i++ )
			{
				Player player = battle.GetPlayerAt( i );
				player.user = BS.instance.userMgr.CreateUser( player.id, battle );
			}

			//把战场加入工作列表
			this._workingBattles.Add( battle );

			battle.Start();

			Logger.Log( $"battle:{battle.id} created" );

			return ErrorCode.Success;
		}

		/// <summary>
		/// 销毁战场
		/// 主线程调用
		/// </summary>
		private void EndBattle( Battle battle )
		{
			int count = battle.numPlayers;
			//通知CS战场结束
			Protos.BS2CS_BattleEnd battleEnd = ProtoCreator.Q_BS2CS_BattleEnd();
			battleEnd.Bid = battle.id;
			for ( int i = 0; i < count; ++i )
			{
				Player player = battle.GetPlayerAt( i );
				var info = new Protos.BS2CS_BattleEndInfo();
				info.Win = player.win;
				info.Damage = player.damage;
				info.Hurt = player.hurt;
				info.Heal = player.heal;
				info.OccupyTime = player.occupyTime;
				info.Skill0Used = player.skill0Used;
				info.Skill0Damage = player.skill0Damage;
				info.Skill1Used = player.skill1Used;
				info.Skill1Damage = player.skill1Damage;
				battleEnd.Infos.Add( player.user.gcNID, info );
			}
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, battleEnd );

			for ( int i = 0; i < count; i++ )
			{
				Player player = battle.GetPlayerAt( i );
				if ( player.user.isOnline )
				{
					//断开玩家连接
					BS.instance.netSessionMgr.DelayCloseSession( player.user.gcSID, 100, "battle_end" );
					//玩家下线
					BS.instance.userMgr.Offline( player.user );
				}
				//销毁玩家
				BS.instance.userMgr.DestroyUser( player.user );
			}
			//处理战场的身后事
			battle.End();

			this._workingBattles.Remove( battle );
			POOL.Push( battle );
		}

		public void StopAllBattles()
		{
			int count = this._workingBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._workingBattles[i];
				battle.Interrupt();
			}
		}

		internal void Update( long dt )
		{
			int count = this._workingBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._workingBattles[i];
				//检查战场是否结束
				if ( battle.finished )
				{
					//处理战场结束
					this.EndBattle( battle );
					--i;
					--count;
					Logger.Log( $"battle:{battle.id} destroied" );
				}
			}
		}

		/// <summary>
		/// 玩家请求获取当前战场快照
		/// </summary>
		internal void HandleRequestSnapshot( Battle battle, Protos.GC2BS_RequestSnapshot request, Protos.BS2GC_RequestSnapshotRet ret )
		{
			FrameSnapshot snapshot = battle.GetSnapshot( request.Frame );
			ret.ReqFrame = request.Frame;
			ret.CurFrame = battle.frame;
			if ( snapshot != null )
				ret.Snapshot = snapshot.data;
		}

		/// <summary>
		/// 处理玩家提交的帧行为
		/// </summary>
		internal void HandleFrameAction( ulong gcNID, Battle battle, Protos.GC2BS_FrameAction message )
		{
			if ( battle.finished )
				return;
			battle.HandleFrameAction( gcNID, message );
		}

		/// <summary>
		/// 处理玩家请求帧行为的历史数据
		/// </summary>
		/// <param name="battle">战场</param>
		/// <param name="from">起始帧</param>
		/// <param name="to">结束帧</param>
		/// <param name="ret">需要填充的消息</param>
		internal void HandleRequestFrameActions( Battle battle, int from, int to, Protos.BS2GC_RequestFrameActionsRet ret ) =>
			battle.HandleRequestFrameActions( @from, to, ret );

		/// <summary>
		/// 处理玩家提交的快照数据
		/// </summary>
		/// <param name="battle">战场</param>
		/// <param name="gcNID">玩家ID</param>
		/// <param name="frame">快照所在的帧数</param>
		/// <param name="data">快照数据</param>
		internal void HandleCommitSnapshot( Battle battle, ulong gcNID, int frame, Google.Protobuf.ByteString data ) =>
			battle.HandleCommitSnapshot( gcNID, frame, data );

		public void HandleBattleEnd( Battle battle, ulong gcNID, Protos.GC2BS_EndBattle endBattle ) =>
			battle.HandleBattleEnd( gcNID, endBattle );

		/// <summary>
		/// 获取指定索引的战场
		/// </summary>
		public Battle GetBattleAt( int index )
		{
			if ( index < 0 || index >= this._workingBattles.Count )
				return null;
			return this._workingBattles[index];
		}

		/// <summary>
		/// 以字符串的形式返回所有战场ID
		/// </summary>
		public string ListBids()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( Battle battle in this._workingBattles )
				sb.AppendLine( battle.id.ToString() );
			return sb.ToString();
		}
	}
}