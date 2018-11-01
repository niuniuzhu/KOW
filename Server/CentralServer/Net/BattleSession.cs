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
			//更新BS列表
			CS.instance.lIDToBSInfos.Remove( this.logicID );
			CS.instance.UpdateAppropriateBSInfo();

			//踢出所有连接到该GS的玩家
			CS.instance.battleStaging.Remove( this.logicID );

			this.logicID = 0;
			base.OnClose( reason );
			Logger.Info( $"BS({this.id}) disconnected with msg:{reason}" );
		}

		private ErrorCode OnBSAskPing( IMessage message )
		{
			Protos.G_AskPing askPing = ( Protos.G_AskPing ) message;
			Protos.G_AskPingRet askPingRet = ProtoCreator.R_G_AskPing( askPing.Opts.Pid );
			askPingRet.Stime = askPing.Time;
			askPingRet.Time = TimeUtils.utcTime;
			this.Send( askPingRet );
			return ErrorCode.Success;
		}

		private ErrorCode OnBs2CsReportState( IMessage message )
		{
			Protos.BS2CS_ReportState reportState = ( Protos.BS2CS_ReportState ) message;
			return this.BStateReportHandler( reportState.BsInfo, this.id );
		}

		private ErrorCode BStateReportHandler( Protos.BSInfo BSInfoRecv, uint nid )
		{
			this.logicID = BSInfoRecv.Id;
			bool hasRecord = CS.instance.lIDToBSInfos.TryGetValue( this.logicID, out BSInfo gsInfo );
			if ( !hasRecord )
			{
				gsInfo = new BSInfo();
				CS.instance.lIDToBSInfos[this.logicID] = gsInfo;
			}
			//更新BS信息
			gsInfo.lid = this.logicID;
			gsInfo.sessionID = nid;
			gsInfo.ip = BSInfoRecv.Ip;
			gsInfo.port = BSInfoRecv.Port;
			gsInfo.state = ( BSInfo.State ) BSInfoRecv.State;
			Logger.Log( $"report from BS:{gsInfo}" );
			return ErrorCode.Success;
		}

		/// <summary>
		/// BS通知战场开始
		/// </summary>
		private ErrorCode OnBs2CsBattleStart( IMessage message )
		{
			Protos.BS2CS_BattleStart battleStart = ( Protos.BS2CS_BattleStart ) message;
			Protos.CS2BS_BattleStartRet ret = ProtoCreator.R_BS2CS_BattleStart( battleStart.Opts.Pid );
			this.Send( ret );
			return ErrorCode.Success;
		}

		/// <summary>
		/// BS通知战场结束
		/// </summary>
		private ErrorCode OnBs2CsBattleEnd( IMessage message )
		{
			Protos.BS2CS_BattleEnd battleEnd = ( Protos.BS2CS_BattleEnd ) message;
			//移除指定BS里指定战场里的所有玩家
			CS.instance.battleStaging.Remove( this.logicID, battleEnd.Bid );
			//todo 战斗结算
			Protos.CS2BS_BattleEndRet ret = ProtoCreator.R_BS2CS_BattleEnd( battleEnd.Opts.Pid );
			this.Send( ret );
			return ErrorCode.Success;
		}
	}
}