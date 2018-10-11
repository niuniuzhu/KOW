using Core.Misc;
using Google.Protobuf;
using Shared;
using System;
using System.Collections.Generic;
using CentralServer.User;

namespace CentralServer.Match
{
	public class Matcher
	{
		private static Matcher _instance;
		public static Matcher instance => _instance ?? ( _instance = new Matcher() );

		private static readonly ObejctPool<Room> POOL = new ObejctPool<Room>( 50, 25 );

		private readonly List<Room> _rooms = new List<Room>();

		private Matcher()
		{
		}

		private bool CheckUser( ulong gcNID )
		{
			return CS.instance.userMgr.HasUser( gcNID );
		}

		private Room CreateRoom( ulong gcNID )
		{
			if ( !this.CheckUser( gcNID ) )
				return null;

			Room room = POOL.Pop();
			room.AddUser( gcNID );
			this._rooms.Add( room );
			return room;
		}

		private Room SelectRoom( ulong gcNID )
		{
			if ( this._rooms.Count > 0 )
			{
				Random rnd = new Random();
				int index = rnd.Next( 0, this._rooms.Count );

				if ( !this.CheckUser( gcNID ) )
					return null;

				Room room = this._rooms[index];
				room.AddUser( gcNID );
				return room;
			}
			return this.CreateRoom( gcNID );
		}

		private void DestroyRoom( Room room )
		{
			room.Clear();
			this._rooms.Remove( room );
			POOL.Push( room );
		}

		private void BeginBattle( Room room )
		{
			Protos.CS2GC_BeginBattle beginBattle = ProtoCreator.Q_CS2GC_BeginBattle();
			beginBattle.MapID = 0;//todo
			for ( int i = 0; i < room.numUsers; i++ )
			{
				Protos.CS_PlayerInfo playerInfo = new Protos.CS_PlayerInfo();
				playerInfo.Id = room.GetUserAt( i );
				//todo other infos
				beginBattle.PlayInfos.Add( playerInfo );
			}
			for ( int i = 0; i < room.numUsers; i++ )
			{
				ulong gcNID = room.GetUserAt( i );
				beginBattle.MTrans( Protos.MsgOpts.Types.TransTarget.Gc, gcNID );
				CS.instance.userMgr.SendToUser( gcNID, beginBattle );
			}
		}

		public ErrorCode OnGc2CsBeginMatch( uint sid, IMessage message )
		{
			Protos.GC2CS_BeginMatch beginMatch = ( Protos.GC2CS_BeginMatch ) message;
			Protos.CS2GC_BeginMatchRet ret = ProtoCreator.R_GC2CS_BeginMatch( beginMatch.Opts.Pid );
			ret.MTrans( Protos.MsgOpts.Types.TransTarget.Gc, beginMatch.Opts.Transid );
			ret.Result = Protos.Global.Types.ECommon.Success;

			Room room = this.SelectRoom( beginMatch.Opts.Transid );
			if ( room == null )
				ret.Result = Protos.Global.Types.ECommon.Failed;
			CS.instance.netSessionMgr.Send( sid, ret );

			if ( room != null && room.IsFull() )
			{
				this.BeginBattle( room );
				this.DestroyRoom( room );
			}

			return ErrorCode.Success;
		}
	}
}