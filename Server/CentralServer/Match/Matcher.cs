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

		public ErrorCode OnGc2CsBeginMatch( IMessage message )
		{
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch ) message;
		}
	}
}