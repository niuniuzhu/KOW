using BattleServer.User;
using Core.Misc;
using Newtonsoft.Json.Linq;
using Shared;
using Shared.Net;
using System;
using System.Collections.Generic;
using BattleServer.Battle.Snapshot;

namespace BattleServer.Battle
{
	public class BattleManager
	{
		private static readonly ObjectPool<Battle> POOL = new ObjectPool<Battle>();

		private readonly Dictionary<ulong, Battle> _gcNIDToBattle = new Dictionary<ulong, Battle>();
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
			bid = 0;
			int frameRate, keyframeStep, timeout;
			JArray bornPos;
			try
			{
				JObject mapDef = ( JObject ) BS.instance.defs["map"]["m" + battleInfo.MapID];
				frameRate = ( int ) mapDef["frame_rate"];
				keyframeStep = ( int ) mapDef["keyframe_step"];
				timeout = ( int ) mapDef["timeout"];
				bornPos = ( JArray ) mapDef["born_pos"];
				int maxPlayer = ( int ) mapDef["max_players"];
				if ( maxPlayer != battleInfo.PlayerInfo.Count )
					return ErrorCode.Failed;
				if ( bornPos.Count != maxPlayer * 2 )
					return ErrorCode.Failed;
			}
			catch ( Exception e )
			{
				Logger.Error( e.ToString() );
				return ErrorCode.Failed;
			}

			Battle battle = POOL.Pop();
			bid = battle.id;

			//初始化战场描述
			BattleEntry battleEntry;
			battleEntry.mapID = battleInfo.MapID;
			battleEntry.frameRate = frameRate;
			battleEntry.keyframeStep = keyframeStep;
			battleEntry.battleTime = timeout;
			int count = battleInfo.PlayerInfo.Count;
			battleEntry.players = new Player[count];
			for ( int i = 0; i < count; i++ )
			{
				Protos.CS2BS_PlayerInfo playerInfo = battleInfo.PlayerInfo[i];
				Player player = new Player
				{
					gcNID = playerInfo.GcNID,
					actorID = playerInfo.ActorID,
					name = playerInfo.Name,
					bornX = ( int ) bornPos[i * 2],
					bornY = ( int ) bornPos[i * 2 + 1]
				};
				battleEntry.players[i] = player;

				this._gcNIDToBattle[playerInfo.GcNID] = battle;
			}

			//初始化战场
			battle.Init( battleEntry );
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
				int count = battle.players.Length;
				for ( int i = 0; i < count; i++ )
					BS.instance.userMgr.Offline( battle.players[i].user );
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
			int count = battle.players.Length;
			for ( var i = 0; i < count; i++ )
			{
				Player player = battle.players[i];
				if ( player.gcNID != user.gcNID )
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
			int count = battle.players.Length;
			for ( var i = 0; i < count; i++ )
			{
				Player player = battle.players[i];
				if ( player.user != user )
					continue;
				player.user = null;
				return;
			}
		}

		/// <summary>
		/// 玩家请求获取当前战场状态
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
				break;
			} while ( true );
			user.Send( ret );
		}
	}
}