using CentralServer.Match;
using Core.Misc;
using MatchingTest.Properties;
using Shared;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace MatchingTest
{
	static class Program
	{
		private static readonly List<MatchSystem> _matchingSystems = new List<MatchSystem>();
		private static InputHandler _inputHandler;
		private static readonly Random _rnd = new Random();

		static void Main( string[] args )
		{
			Hashtable json = ( Hashtable )MiniJSON.JsonDecode( Encoding.UTF8.GetString( Resources.matching ) );
			Hashtable[] instanceDefs = json.GetMapArray( "instances" );
			foreach ( Hashtable instanceDef in instanceDefs )
			{
				MatchSystem matchSystem = new MatchSystem();
				matchSystem.InitFromDefs( instanceDef );
				_matchingSystems.Add( matchSystem );
			}

			_matchingSystems[0].eventHandler = ( t, u, s ) =>
			{
				switch ( t )
				{
					case MatchEvent.Type.MatchSuccess:
						Console.WriteLine( "success:" + s.Dump() );
						break;
				}
			};

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			MainLoop();
		}

		private static void MainLoop()
		{
			while ( true )
			{
				//bool r;
				//if ( ( r = _enumerator.MoveNext() ) == false )
				//{
				//	_enumerator = TestC();
				//}
				//Console.WriteLine( "ok" );
				foreach ( MatchSystem matchingSystem in _matchingSystems )
				{
					matchingSystem.Update( 20 );
					matchingSystem.CheckRoom();
				}
				_inputHandler.ProcessInput();
				Thread.Sleep( 20 );
			}
		}

		private static void HandleInput( string cmd )
		{
			string[] pairs = cmd.Split( ' ' );
			switch ( pairs[0] )
			{
				case "a":
					{
						MatchRoomUser user = new MatchRoomUser( GuidHash.GetUInt64(), int.Parse( pairs[1] ) );
						_matchingSystems[0].Join( user );
					}
					break;

				case "d":
					break;

				case "b":
					{
						int count = int.Parse( pairs[1] );
						for ( int i = 0; i < count; i++ )
						{
							ulong id = GuidHash.GetUInt64();
							int rank = _rnd.Next( 0, 1000 );
							//Console.WriteLine( $"add id:{id}, rank:{rank}" );
							MatchRoomUser user = new MatchRoomUser( id, rank );
							_matchingSystems[0].Join( user );
						}
					}
					break;

				case "x":
					foreach ( MatchSystem matchingSystem in _matchingSystems )
					{
						Console.WriteLine( matchingSystem.Dump() );
					}
					break;

				case "cls":
					Console.Clear();
					break;
			}
		}
	}
}
