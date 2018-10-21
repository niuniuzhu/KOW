using Core.Misc;
using Core.Net;
using Google.Protobuf;
using Shared;
using Shared.Net;

namespace CentralServer.Net
{
	public class BattleSession : SrvCliSession
	{
		protected BattleSession( uint id, ProtoType type ) : base( id, type )
		{
			this._msgCenter.Register( Protos.MsgID.EGAskPing, this.OnBSAskPing );
			this._msgCenter.Register( Protos.MsgID.EBs2CsReportState, this.OnBs2CsReportState );
			this._msgCenter.Register( Protos.MsgID.EBs2CsBattleStart, this.OnBs2CsBattleStart );
			this._msgCenter.Register( Protos.MsgID.EBs2CsBattleEnd, this.OnBs2CsBattleEnd );
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"BS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			this.logicID = 0;

			base.OnClose( reason );
			Logger.Info( $"BS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnBSAskPing( Google.Protobuf.IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing ) message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnBs2CsReportState( Google.Protobuf.IMessage message )
		{
			Protos.BS2CS_ReportState reportState = ( Protos.BS2CS_ReportState ) message;
			this.logicID = reportState.BsInfo.Id;
			return CS.instance.BStateReportHandler( reportState.BsInfo, this.id );
		}

		/// <summary>
		/// BS通知战场开始
		/// </summary>
		private ErrorCode OnBs2CsBattleStart( IMessage message )
		{
			Protos.BS2CS_BattleStart battleStart = ( Protos.BS2CS_BattleStart ) message;
			Protos.CS2BS_BattleStartRet ret = ProtoCreator.R_BS2CS_BattleStart( battleStart.Opts.Pid );
			return ErrorCode.Success;
		}

		/// <summary>
		/// BS通知战场结束
		/// </summary>
		private ErrorCode OnBs2CsBattleEnd( IMessage message )
		{
			Protos.BS2CS_BattleEnd battleEnd = ( Protos.BS2CS_BattleEnd ) message;
			Protos.CS2BS_BattleEndRet ret = ProtoCreator.R_BS2CS_BattleEnd( battleEnd.Opts.Pid );
			CS.instance.matcher.SetUserIdle( battleEnd.Bid. );
			//todo 需要把玩家状态改变为休闲
			return ErrorCode.Success;
		}
	}
}