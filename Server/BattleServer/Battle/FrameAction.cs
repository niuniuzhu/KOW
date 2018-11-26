using Core.FMath;
using Core.Net;
using System;

namespace BattleServer.Battle
{
	public class FrameAction
	{
		[Flags]
		public enum InputFlag
		{
			None = 0,
			Move = 1 << 0,
			Skill1 = 1 << 1,
			Skill2 = 1 << 2,
		}

		public ulong gcNID { get; }

		/// <summary>
		/// 输入标志位
		/// </summary>
		public InputFlag inputFlag { get; private set; }

		/// <summary>
		/// 输入偏移量x
		/// </summary>
		public Fix64 dx { get; private set; }

		/// <summary>
		/// 输入偏移量y
		/// </summary>
		public Fix64 dy { get; private set; }

		/// <summary>
		/// 获取一个布尔值,指示该帧行为是否有效
		/// </summary>
		public bool isValid => this.inputFlag > 0;

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
		public void MergeFromProto( Protos.GC2BS_FrameAction action )
		{
			this.inputFlag = ( InputFlag )action.InputFlag;
			if ( ( this.inputFlag & InputFlag.Move ) > 0 )
			{
				this.inputFlag |= InputFlag.Move;
				this.dx = ( Fix64 )action.Dx;
				this.dy = ( Fix64 )action.Dy;
			}
		}

		public void SerializeTo( StreamBuffer buffer )
		{
			buffer.Write( this.gcNID );
			buffer.Write( ( byte )this.inputFlag );
			if ( ( this.inputFlag & InputFlag.Move ) > 0 )
			{
				buffer.Write( ( float )this.dx );
				buffer.Write( ( float )this.dy );
			}
		}

		public void Clear()
		{
			this.inputFlag = 0;
			this.dx = this.dy = Fix64.Zero;
		}
	}
}