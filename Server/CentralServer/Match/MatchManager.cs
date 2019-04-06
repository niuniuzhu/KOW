using CentralServer.User;
using Core.Misc;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;

namespace CentralServer.Match
{
	public class MatchManager
	{
		private readonly Dictionary<byte, MatchSystem> _matchingSystems = new Dictionary<byte, MatchSystem>();
		private readonly Dictionary<ulong, MatchRoomUser> _userIDToRoomUser = new Dictionary<ulong, MatchRoomUser>();
		private readonly Stopwatch _sw = new Stopwatch();
		private long _maxElapsePerUpdate;

		private IEnumerator enumerator;

		public MatchManager()
		{
			this.enumerator = this.OnCoroutine();
		}

		public void InitFromDefs( Hashtable json )
		{
			Hashtable[] defs = json.GetMapArray( "instances" );
			this._maxElapsePerUpdate = json.GetInt( "max_elapse_per_update" );
			foreach ( Hashtable def in defs )
			{
				MatchSystem matchSystem = new MatchSystem();
				matchSystem.InitFromDefs( def );
				matchSystem.eventHandler += this.OnEvent;
				this._matchingSystems[matchSystem.mode] = matchSystem;
			}
		}

		internal void OnHeartBeat( long dt )
		{
			foreach ( var kv in this._matchingSystems )
				kv.Value.Update( dt );

			this._sw.Restart();
			if ( !this.enumerator.MoveNext() )
				this.enumerator = this.OnCoroutine();
		}

		private IEnumerator OnCoroutine()
		{
			foreach ( var kv in this._matchingSystems )
			{
				kv.Value.CheckRoom();
				if ( this._sw.ElapsedMilliseconds >= this._maxElapsePerUpdate )
				{
					this._sw.Stop();
					yield return 0;
				}
			}
		}

		private void OnEvent( MatchEvent.Type type, MatchRoomUser sender, BattleUserInfo battleUserInfo )
		{
			switch ( type )
			{
				case MatchEvent.Type.AddToRoom:
					{
						Protos.CS2GC_AddToMatch response = ProtoCreator.Q_CS2GC_AddToMatch();
						CS.instance.userMgr.GetUser( sender.id ).Send( response );
					}
					break;

				case MatchEvent.Type.RemoveFromRoom:
					{
						Protos.CS2GC_RemoveFromMatch response = ProtoCreator.Q_CS2GC_RemoveFromMatch();
						CS.instance.userMgr.GetUser( sender.id ).Send( response );
					}
					break;

				case MatchEvent.Type.RoomInfo:
					{
						Protos.CS2GC_MatchState pMatchState = ProtoCreator.Q_CS2GC_MatchState();
						int c1 = battleUserInfo.tUsers.Length;
						for ( int i = 0; i < c1; i++ )
						{
							BattleUser[] roomUsers = battleUserInfo.tUsers[i];
							int c2 = roomUsers.Length;
							for ( int j = 0; j < c2; j++ )
							{
								BattleUser roomUser = roomUsers[j];
								if ( roomUser == null )
								{
									Protos.CS2GC_PlayerInfo playerInfo = new Protos.CS2GC_PlayerInfo
									{
										Vaild = false,
									};
									pMatchState.PlayerInfos.Add( playerInfo );
								}
								else
								{
									CSUser user = CS.instance.userMgr.GetUser( roomUser.id );
									Protos.CS2GC_PlayerInfo playerInfo = new Protos.CS2GC_PlayerInfo
									{
										Vaild = true,
										GcNID = user.gcNID,
										Team = i,
										ActorID = user.actorID,
										Nickname = user.nickname,
										Avatar = user.avatar,
										Gender = user.gender,
										Money = user.money,
										Diamoned = user.diamoned,
										Rank = user.rank
									};
									pMatchState.PlayerInfos.Add( playerInfo );
								}
							}
						}
						CS.instance.battleEntry.Broadcast( battleUserInfo.users, pMatchState );
					}
					break;

				case MatchEvent.Type.MatchSuccess:
					foreach ( MatchRoomUser user in battleUserInfo.users )
						this._userIDToRoomUser.Remove( user.id );
					CS.instance.battleEntry.BeginBattle( battleUserInfo.users, battleUserInfo.tUsers );
					break;
			}
		}

		internal bool Join( Protos.GC2CS_BeginMatch.Types.EMode mode, CSUser user )
		{
			if ( this._userIDToRoomUser.ContainsKey( user.gcNID ) )
				return false;

			byte mode2;
			switch ( mode )
			{
				case Protos.GC2CS_BeginMatch.Types.EMode.T1P1:
					mode2 = ( 1 << 4 ) | 1;
					break;

				case Protos.GC2CS_BeginMatch.Types.EMode.T2P1:
					mode2 = ( 2 << 4 ) | 1;
					break;

				case Protos.GC2CS_BeginMatch.Types.EMode.T2P2:
					mode2 = ( 2 << 4 ) | 2;
					break;

				case Protos.GC2CS_BeginMatch.Types.EMode.T4P1:
					mode2 = ( 4 << 4 ) | 1;
					break;

				default:
					Logger.Warn( $"not support mode:{mode}" );
					return false;
			}
			if ( !this._matchingSystems.TryGetValue( mode2, out MatchSystem matchingSystem ) )
				return false;

			MatchRoomUser roomUser = new MatchRoomUser( user.gcNID, user.rank );
			this._userIDToRoomUser[user.gcNID] = roomUser;
			if ( !matchingSystem.Join( roomUser ) )
			{
				this._userIDToRoomUser.Remove( user.gcNID );
				return false;
			}
			return true;
		}

		/// <summary>
		/// 移除匹配玩家
		/// </summary>
		internal bool Leave( CSUser user )
		{
			if ( !this._userIDToRoomUser.TryGetValue( user.gcNID, out MatchRoomUser roomUser ) )
				return false;
			this._userIDToRoomUser.Remove( user.gcNID );
			return roomUser.room == null || roomUser.room.system.Leave( roomUser );
		}
	}
}