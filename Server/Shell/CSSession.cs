﻿using Core.Misc;
using Core.Net;

namespace Shell
{
	public class CSSession : MasterSession
	{
		protected override string key => "C01B0BAE-4948-4F02-9F45-BC371274C295";

		private CSSession( uint id, ProtoType type ) : base( id, type )
		{
		}

		protected override void OnEstablish()
		{
			base.OnEstablish();
			Logger.Info( $"CS({this.id}) connected" );
		}

		protected override void OnClose( string reason )
		{
			base.OnClose( reason );
			Logger.Info( $"CS({this.id}) disconnected with msg:{reason}" );
		}
	}
}