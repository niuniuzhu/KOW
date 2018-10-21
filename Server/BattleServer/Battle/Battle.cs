using Core.Misc;

namespace BattleServer.Battle
{
	public class Battle : IPoolObject
	{
		private static uint _gid;

		public uint id { get; private set; }

		private readonly StepLocker _stepLocker = new StepLocker();
		private BattleDescript _battleDes;

		public Battle()
		{
			System.Diagnostics.Debug.Assert( _gid < uint.MaxValue, "maximum id of battle!!" );
			this.id = _gid++;
		}

		public void Clear()
		{
			this.id = 0;
			this._stepLocker.Reset();
		}

		/// <summary>
		/// 初始化
		/// </summary>
		public void Init( BattleDescript battleDes )
		{
			this._battleDes = battleDes;
			this._stepLocker.Init( this, battleDes.frameRate, battleDes.keyframeStep );
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