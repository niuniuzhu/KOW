using BattleServer.User;
using Core.Misc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using BattleServer.Battle.Snapshot;

namespace BattleServer.Battle
{
	public class Battle : IPoolObject, ISnapshotable
	{
		private static uint _gid;

		public uint id { get; }
		public bool finished { get; private set; }
		public int frameRate { get; private set; }
		public int keyframeStep { get; private set; }
		public int mapID { get; private set; }
		public int battleTime { get; private set; }
		public Player[] players { get; private set; }

		private readonly Stopwatch _sw = new Stopwatch();
		private readonly StepLocker _stepLocker = new StepLocker();
		private readonly SnapshotMgr _snapshotMgr = new SnapshotMgr();
		private readonly List<uint> _tempSIDs = new List<uint>();
		private long _lastUpdateTime;

		public Battle()
		{
			Debug.Assert( _gid < uint.MaxValue, "maximum id of waiting room!!" );
			this.id = _gid++;
		}

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
		public void Init( BattleEntry battleEntry )
		{
			this.frameRate = battleEntry.frameRate;
			this.keyframeStep = battleEntry.keyframeStep;
			this.mapID = battleEntry.mapID;
			this.battleTime = battleEntry.battleTime;
			this.players = battleEntry.players;

			this._stepLocker.Init( this, battleEntry.frameRate, battleEntry.keyframeStep );
			this._sw.Start();
			Task.Factory.StartNew( this.AsyncLoop, TaskCreationOptions.LongRunning );
		}

		private void AsyncLoop()
		{
			while ( true )
			{
				long elapsed = this._sw.ElapsedMilliseconds - this._lastUpdateTime;

				this._stepLocker.Update( elapsed );

				this._lastUpdateTime = this._sw.ElapsedMilliseconds;

				Thread.Sleep( 1 );

				if ( this._sw.ElapsedMilliseconds >= this.battleTime )
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
			int count = this.players.Length;
			for ( int i = 0; i < count; i++ )
			{
				BSUser user = this.players[i].user;
				//未连接的不广播
				if ( user == null || !user.isConnected || gcNIDExcept != 0 && gcNIDExcept == user.gcNID )
					continue;

				this._tempSIDs.Add( user.gcSID );
			}
			BS.instance.netSessionMgr.Broadcast( this._tempSIDs, message );
			this._tempSIDs.Clear();
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

		/// <summary>
		/// 获取指定帧数下的战场快照
		/// </summary>
		/// <param name="frame">指定帧数下的快速,-1表示最近的快照</param>
		public FrameSnapshot GetSnapshot( int frame = -1 ) => this._snapshotMgr.GetSnapshot( frame );

		public ISnapshotObject MakeSnapshot( object data )
		{
			throw new System.NotImplementedException();
		}
	}
}