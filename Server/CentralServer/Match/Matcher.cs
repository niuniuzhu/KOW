using System.Collections.Generic;
using Google.Protobuf;
using Shared;

namespace CentralServer.Match
{
	public class Matcher
	{
		private static Matcher _instance;
		public static Matcher instance => _instance ?? ( _instance = new Matcher() );

		private readonly Dictionary<uint, Room> _rooms = new Dictionary<uint, Room>();

		private Matcher()
		{
		}

		public ErrorCode OnGc2CsBeginMatch( uint sid, IMessage message )
		{
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch ) message;
			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );
			ProtoCreator.MakeTransMessage( ret, Protos.MsgOpts.Types.TransTarget.Gc, beginMatch.Opts.Transid );
			CS.instance.netSessionMgr.Send( sid, ret );
			return ErrorCode.Success;
		}
	}
}