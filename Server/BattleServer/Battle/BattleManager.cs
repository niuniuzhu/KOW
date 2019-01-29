using BattleServer.Battle.Model;
using BattleServer.Battle.Snapshot;
using BattleServer.User;
using Core.Misc;
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
		private readonly List<Battle> _finishBattles = new List<Battle>();

		/// <summary>
		/// 获取战场数量
		/// </summary>
		public int numBattles => this._workingBattles.Count;

		/// <summary>
		/// 创建战场
		/// </summary>
		internal void CreateBattle( Protos.CS2BS_BattleInfo battleInfo, Action<uint, bool> callback )
		{
			//创建战场
			Battle battle = POOL.Pop();

			//创建战场描述
			BattleEntry battleEntry;
			battleEntry.rndSeed = this._random.Next();
			battleEntry.mapID = battleInfo.MapID;
			int count = battleInfo.PlayerInfos.Count;
			battleEntry.users = new BSUser[count];
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2BS_PlayerInfo playerInfo = battleInfo.PlayerInfos[i];
				//检查玩家是否在别的战场
				if ( BS.instance.userMgr.HasUser( playerInfo.GcNID ) )
				{
					callback( 0, false );
					return;
				}
				//创建玩家
				battleEntry.users[i] = BS.instance.userMgr.CreateUser( playerInfo, battle );
			}

			//初始化战场
			battle.Init( battleEntry );

			//回调函数,通知GC创建战场成功
			callback( battle.id, true );

			//把战场加入工作列表
			this._workingBattles.Add( battle );
			//战场开始
			battle.Start();

			Logger.Log( $"battle:{battle.id} created" );
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
					this._workingBattles.RemoveAt( i );
					--i;
					--count;
					this._finishBattles.Add( battle );
					//处理战场结束
					this.EndBattle( battle );
				}
			}
		}

		/// <summary>
		/// 销毁战场
		/// 主线程调用
		/// </summary>
		private void EndBattle( Battle battle )
		{
			battle.Stop();
			int count = battle.numChampions;
			//通知CS战场结束
			Protos.BS2CS_BattleEnd battleEnd = ProtoCreator.Q_BS2CS_BattleEnd();
			battleEnd.Bid = battle.id;
			for ( int i = 0; i < count; ++i )
			{
				Champion champion = battle.GetChampionAt( i );
				var info = new Protos.BS2CS_BattleEndInfo
				{
					Result = ( Protos.BS2CS_BattleEndInfo.Types.Result )champion.result,
					Team = champion.team,
					Money = champion.user.money,
					Diamoned = champion.user.diamoned,
					Honor = champion.user.honor,
					Damage = champion.damage,
					Hurt = champion.hurt,
					Heal = champion.heal,
					OccupyTime = champion.occupyTime,
					Skill0Used = champion.skill0Used,
					Skill0Damage = champion.skill0Damage,
					Skill1Used = champion.skill1Used,
					Skill1Damage = champion.skill1Damage,
				};
				battleEnd.Infos.Add( champion.user.gcNID, info );
			}
			BS.instance.netSessionMgr.Send( SessionType.ServerB2CS, battleEnd, RPCEntry.Pop( this.OnCSBattleEndRet, battle ) );
		}

		private void OnCSBattleEndRet( NetSessionBase session, Google.Protobuf.IMessage message, object[] args )
		{
			Battle battle = ( Battle )args[0];
			int count = battle.numChampions;
			for ( int i = 0; i < count; i++ )
			{
				Champion champion = battle.GetChampionAt( i );
				if ( champion.user.isOnline )
				{
					//断开玩家连接
					BS.instance.netSessionMgr.CloseSession( champion.user.gcSID, "battle_end" );
					//玩家下线
					BS.instance.userMgr.Offline( champion.user );
				}
				//销毁玩家
				BS.instance.userMgr.DestroyUser( champion.user );
			}
			this._finishBattles.Remove( battle );
			Logger.Log( $"battle:{battle.id} destroied" );
			POOL.Push( battle );
		}

		internal void StopAllBattles()
		{
			int count = this._workingBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._workingBattles[i];
				battle.Stop();
				POOL.Push( battle );
			}
			this._workingBattles.Clear();
			count = this._finishBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._workingBattles[i];
				POOL.Push( battle );
			}
			this._finishBattles.Clear();
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
		internal void HandleFrameAction( ulong gcNID, Battle battle, Protos.GC2BS_FrameAction message ) =>
			battle.HandleFrameAction( gcNID, message );

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