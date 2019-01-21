using Core.Net;
using System;
using System.Collections.Generic;

namespace BattleServer.Battle
{
	public class FrameAction
	{
		[Flags]
		public enum InputFlag
		{
			None = 0,
			Move = 1 << 0,
			S1 = 1 << 1,
			S2 = 1 << 2
		}

		public ulong gcNID { get; }

		private const int MAX_ACTION = 16;

		private readonly List<Protos.GC2BS_FrameActionInfo> _actions = new List<Protos.GC2BS_FrameActionInfo>();

		public FrameAction( ulong gcNID )
		{
			this.gcNID = gcNID;
		}

		/// <summary>
		/// 合并Action
		/// 在两个关键帧之间所有的输入都需要合并
		/// 合并规则是:相同标志位的,后者覆盖前者,不同标志位则使用并操作
		/// 例如:在第n帧输入方向,n+1帧输入skill1,n+2帧再次输入方向,则最终结果是采用n+2帧的方向和skill1
		/// </summary>
		public void AddAction( Protos.GC2BS_FrameAction action )
		{
			if ( this._actions.Count == MAX_ACTION )
				return;
			int count = action.Infos.Count;
			for ( int i = 0; i < count; i++ )
			{
				this._actions.Add( action.Infos[i] );
				if ( this._actions.Count == MAX_ACTION )
					break;
			}
		}

		public void Serialize( StreamBuffer buffer )
		{
			buffer.Write( this.gcNID );
			int count = this._actions.Count;
			buffer.Write( ( byte )count );
			for ( int i = 0; i < count; i++ )
			{
				Protos.GC2BS_FrameActionInfo info = this._actions[i];
				InputFlag inputFlag = ( InputFlag )info.InputFlag;
				buffer.Write( info.Frame );
				buffer.Write( ( byte )inputFlag );
				if ( ( inputFlag & InputFlag.Move ) > 0 )
				{
					buffer.Write( info.V0 );
					buffer.Write( info.V1 );
				}

				if ( ( inputFlag & InputFlag.S1 ) > 0 ||
					 ( inputFlag & InputFlag.S2 ) > 0 )
				{
					buffer.Write( info.V0 );
				}
			}
		}

		public void Clear() => this._actions.Clear();
	}
}