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
		private static readonly ObjectPool<Battle> POOL = new ObjectPool<Battle>( 50, 20 );

		/// <summary>
		/// 战场随机种子产生器
		/// </summary>
		private readonly Random _random = new Random();
		/// <summary>
		/// 客户端网络ID到战场的映射表
		/// </summary>
		private readonly Dictionary<ulong, Battle> _gcNIDToBattle = new Dictionary<ulong, Battle>();
		/// <summary>
		/// 运作中的战场列表
		/// </summary>
		private readonly List<Battle> _workingBattles = new List<Battle>();

		/// <summary>
		/// 检查是否存在指定ID的客户端
		/// </summary>
		public bool IsInBattle( ulong gcNID ) => this._gcNIDToBattle.ContainsKey( gcNID );

		/// <summary>
		/// 广播用的临时SID表
		/// </summary>
		private readonly List<uint> _tempSIDs = new List<uint>();

		/// <summary>
		/// 获取指定ID玩家所在的战场
		/// </summary>
		public Battle GetBattle( ulong gcNID )
		{
			this._gcNIDToBattle.TryGetValue( gcNID, out Battle battle );
			return battle;
		}

		/// <summary>
		/// 检查指定玩家ID所在的战场是否有效(存在?结束?)
		/// </summary>
		public Battle GetValidedBattle( ulong gcNID )
		{
			Battle battle = this.GetBattle( gcNID );
			if ( battle == null )
			{
				Logger.Warn( $"can not find battle for gcNID:{gcNID}" );
				return null;
			}
			if ( battle.finished )
				return null;
			return battle;
		}

		/// <summary>
		/// 开始战斗
		/// </summary>
		public ErrorCode CreateBattle( Protos.CS2BS_BattleInfo battleInfo, out uint bid )
		{
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
			}

			//初始化战场
			Battle battle = POOL.Pop();
			bid = battle.id;
			if ( !battle.Init( battleEntry ) )
			{
				POOL.Push( battle );
				return ErrorCode.Failed;
			}

			//建立玩家ID和战场的映射
			count = battle.numPlayers;
			for ( int i = 0; i < count; i++ )
				this._gcNIDToBattle[battle.GetPlayerAt( i ).id] = battle;

			//把战场加入工作列表
			this._workingBattles.Add( battle );

			battle.Start();

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

		public void Update( long dt )
		{
			int count = this._workingBattles.Count;
			for ( int i = 0; i < count; i++ )
			{
				Battle battle = this._workingBattles[i];
				//检查战场是否结束
				if ( battle.finished )
				{
					//处理战场结束
					this.OnBattleEnd( battle );
					this._workingBattles.RemoveAt( i );
					Logger.Log( $"battle:{battle.id} destroied" );
					--i;
					--count;
				}
			}
		}

		/// <summary>
		/// 对战场上所有玩家进行广播
		/// </summary>
		private void Broadcast( Battle battle, Google.Protobuf.IMessage message, ulong gcNIDExcept = 0 )
		{
			int count = battle.numPlayers;
			for ( int i = 0; i < count; i++ )
			{
				Player player = battle.GetPlayerAt( i );
				//这个判断防止其他线程修改了player表导致取得空指针
				BSUser user = player?.user;
				//未连接的不广播
				if ( user == null || !user.isConnected || gcNIDExcept != 0 && gcNIDExcept == user.gcNID )
					continue;
				this._tempSIDs.Add( user.gcSID );
			}
			BS.instance.netSessionMgr.Broadcast( this._tempSIDs, message );
			this._tempSIDs.Clear();
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
				this.Broadcast( battle, toGCBattleEnd );
				//所有玩家下线
				int count = battle.numPlayers;
				for ( int i = 0; i < count; i++ )
				{
					Player player = battle.GetPlayerAt( i );
					BS.instance.userMgr.Offline( player.user );
					//解除玩家ID和战场的映射
					this._gcNIDToBattle.Remove( player.id );
				}
				//处理battle的身后事
				battle.End();
				POOL.Push( battle );
			} );
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
		internal void HandleRequestSnapshot( ulong gcNID, Protos.GC2BS_RequestSnapshot request, Protos.BS2GC_RequestSnapshotRet ret )
		{
			Battle battle = this.GetBattle( gcNID );
			if ( battle == null )
			{
				Logger.Warn( $"can not find battle for gcNID:{gcNID}" );
				ret.Result = Protos.BS2GC_RequestSnapshotRet.Types.EResult.InvalidBattle;
			}
			else
			{
				FrameSnapshot snapshot = battle.GetSnapshot( request.Frame );
				ret.ReqFrame = request.Frame;
				ret.CurFrame = battle.frame;
				ret.Snapshot = snapshot.data;
			}
		}

		/// <summary>
		/// 处理玩家提交的帧行为
		/// </summary>
		public void HandleFrameAction( ulong gcNID, Protos.GC2BS_FrameAction message )
		{
			Battle battle = this.GetValidedBattle( gcNID );
			battle?.HandleFrameAction( gcNID, message );
		}

		/// <summary>
		/// 处理玩家请求帧行为的历史数据
		/// </summary>
		/// <param name="from">起始帧</param>
		/// <param name="to">结束帧</param>
		/// <param name="ret">需要填充的消息</param>
		public void HandleRequestFrameActions( ulong gcNID, int from, int to, Protos.BS2GC_RequestFrameActionsRet ret )
		{
			Battle battle = this.GetValidedBattle( gcNID );
			battle?.HandleRequestFrameActions( from, to, ret );
		}
	}
}