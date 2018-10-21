using System;
using Core.Misc;
using System.Threading;
using System.Threading.Tasks;

namespace BattleServer.Battle
{
	public class Battle : IPoolObject
	{

		public uint id => this._battleDes.id;

		public bool finished { get; private set; }

		private readonly StepLocker _stepLocker = new StepLocker();
		private BattleDescript _battleDes;
		private readonly System.Diagnostics.Stopwatch _sw = new System.Diagnostics.Stopwatch();
		private long _lastUpdateTime;

		public void Clear()
		{
			this.finished = false;
			this._stepLocker.Reset();
			this._sw.Stop();
			this._sw.Reset();
			this._lastUpdateTime = 0;
		}

		/// <summary>
		/// 初始化
		/// </summary>
		public void Init( BattleDescript battleDes )
		{
			this._battleDes = battleDes;
			this._stepLocker.Init( this, battleDes.frameRate, battleDes.keyframeStep );
			this._sw.Start();
			Task task = Task.Factory.StartNew( this.AsyncLoop, TaskCreationOptions.LongRunning );
		}

		private void AsyncLoop()
		{
			while ( true )
			{
				long elapsed = this._sw.ElapsedMilliseconds - this._lastUpdateTime;

				this._stepLocker.Update( elapsed );

				this._lastUpdateTime = this._sw.ElapsedMilliseconds;

				Thread.Sleep( 1 );

				if ( this._sw.ElapsedMilliseconds >= this._battleDes.battleTime )
				{
					this.finished = true;
					break;
				}
			}
		}

		/// <summary>
		/// 广播消息
		/// </summary>
		/// <param name="message">消息</param>
		/// <param name="gcNIDExcept">剔除gcNID</param>
		public void Broadcast( Google.Protobuf.IMessage message, ulong gcNIDExcept = 0 )
		{
			int count = this._battleDes.players.Count;
			uint[] sids = new uint[count];
			for ( int i = 0; i < count; i++ )
			{
				ulong gcNID = this._battleDes.players[i].gcNID;
				if ( gcNIDExcept != 0 && gcNID == gcNIDExcept )
					continue;
				if ( !BS.instance.userMgr.GetClientSID( gcNID, out sids[i] ) )
					Logger.Warn( $"failed to send message to gcNID:{gcNID}" );
			}
			BS.instance.netSessionMgr.Broadcast( sids, message );
		}

		/// <summary>
		/// 遍历战场所有玩家
		/// </summary>
		public void ForeachPlayer( Action<PlayerDescript> handler )
		{
			int count = this._battleDes.players.Count;
			for ( int i = 0; i < count; i++ )
				handler( this._battleDes.players[i] );
		}

		/// <summary>
		/// 关键帧调用
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="dt">流逝时间</param>
		public void OnKeyframe( int frame, int dt )
		{
		}

		/// <summary>
		/// 逻辑更新
		/// </summary>
		/// <param name="frame">当前帧数</param>
		/// <param name="dt">流逝时间</param>
		public void UpdateLogic( int frame, int dt )
		{
		}
	}
}