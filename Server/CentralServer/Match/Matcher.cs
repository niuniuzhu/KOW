using CentralServer.User;
using Core.Misc;
using Google.Protobuf;
using Shared;
using System;
using System.Collections.Generic;

namespace CentralServer.Match
{
	public class Matcher
	{
		private static readonly ObejctPool<Room> POOL = new ObejctPool<Room>( 50, 25 );

		private readonly List<Room> _rooms = new List<Room>();
		private readonly Dictionary<uint, Room> _idToRoom = new Dictionary<uint, Room>();

		public bool OnUserKicked( ulong gcNID )
		{
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"can not find user:{gcNID}" );
				return false;
			}
			if ( user.inRoom )
			{
				System.Diagnostics.Debug.Assert( this._idToRoom.TryGetValue( user.room, out Room room ) );
				if ( !room.RemoveUser( gcNID ) )
					return false;
				if ( room.IsEmpty )
					this.DestroyRoom( room );
			}
			return true;
		}

		private Room CreateRoom( ulong gcNID )
		{
			CUser user = CS.instance.userMgr.GetUser( gcNID );
			if ( user == null )
			{
				Logger.Warn( $"invalid gcNID:{gcNID}" );
				return null;
			}
			Room room = POOL.Pop();
			Logger.Log( $"room:{room.id} was created" );
			if ( !room.AddUser( gcNID ) )
			{
				Logger.Log( $"room:{room.id} was destroy" );
				POOL.Push( room );
				return null;
			}
			this._rooms.Add( room );
			this._idToRoom[room.id] = room;
			user.room = room.id;
			user.inRoom = true;
			return room;
		}

		private void DestroyRoom( Room room )
		{
			room.RemoveAllUsers();
			this._idToRoom.Remove( room.id );
			this._rooms.Remove( room );
			POOL.Push( room );
			Logger.Log( $"room:{room.id} was destroy" );
		}

		private Room SelectRoom( ulong gcNID )
		{
			if ( this._rooms.Count > 0 )
			{
				Random rnd = new Random();
				int index = rnd.Next( 0, this._rooms.Count );

				CUser user = CS.instance.userMgr.GetUser( gcNID );
				if ( user == null )
				{
					Logger.Warn( $"invalid gcNID:{gcNID}" );
					return null;
				}
				Room room = this._rooms[index];
				if ( !room.AddUser( gcNID ) )
					return null;
				user.room = room.id;
				user.inRoom = true;
				return room;
			}
			return this.CreateRoom( gcNID );
		}

		private void BeginBattle( Room room )
		{
			Protos.CS2GC_BeginBattle beginBattle = ProtoCreator.Q_CS2GC_BeginBattle();
			if ( CS.instance.appropriateBSInfo != null )
			{
				beginBattle.Ip = CS.instance.appropriateBSInfo.ip;
				beginBattle.Port = CS.instance.appropriateBSInfo.port;
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

			if ( room != null && room.IsFull )
			{
				this.BeginBattle( room );
				this.DestroyRoom( room );
			}
			return ErrorCode.Success;
		}
	}
}