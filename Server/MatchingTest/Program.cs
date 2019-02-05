using CentralServer.Match;
using Core.Misc;
using MatchingTest.Properties;
using Shared;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MatchingTest
{
	static class Program
	{
		private static readonly List<MatchSystem> _matchingSystems = new List<MatchSystem>();
		private static InputHandler _inputHandler;
		private static readonly Random _rnd = new Random();
		private static IEnumerator _enumerator;

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
					case MatchUserEvent.Type.AddToGrading:
						break;
					case MatchUserEvent.Type.RemoveFromGrading:
						break;
					case MatchUserEvent.Type.AddToLounge:
						break;
					case MatchUserEvent.Type.RemoveFromLounge:
						break;
					case MatchUserEvent.Type.MatchSuccess:
						Console.WriteLine( s.Dump() );
						break;
				}
			};

			Task.Factory.StartNew( Update, CancellationToken.None, TaskCreationOptions.LongRunning, TaskScheduler.Default );

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			MainLoop();
		}

		private static void MainLoop()
		{
			_enumerator = TestC();
			while ( true )
			{
				//bool r;
				//if ( ( r = _enumerator.MoveNext() ) == false )
				//{
				//	_enumerator = TestC();
				//}
				//Console.WriteLine( "ok" );
				_inputHandler.ProcessInput();
				Thread.Sleep( 10 );
			}
		}

		private static IEnumerator TestC()
		{
			Stopwatch sw = new Stopwatch();
			sw.Start();
			double a = 100;
			for ( int i = 0; i < 10000000; i++ )
			{
				a = Math.Sin( a );
				if ( sw.ElapsedMilliseconds > 100 )
				{
					sw.Restart();
					Console.WriteLine( $"yield:{i}" );
					yield return i;
				}
			}
			Console.WriteLine( "done" );
		}

		private static void Update()
		{
			while ( true )
			{
				foreach ( MatchSystem matchingSystem in _matchingSystems )
				{
					matchingSystem.Update( 20 );
					Thread.Sleep( 20 );
				}
			}
		}

		private static void HandleInput( string cmd )
		{
			string[] pairs = cmd.Split( ' ' );
			switch ( pairs[0] )
			{
				case "a":
					_matchingSystems[0].CreateUser( GuidHash.GetUInt64(), int.Parse( pairs[1] ) );
					break;

				case "d":
					break;

				case "b":
					int count = int.Parse( pairs[1] );
					for ( int i = 0; i < count; i++ )
					{
						ulong id = GuidHash.GetUInt64();
						int rank = _rnd.Next( 0, 150 );
						Console.WriteLine( $"add id:{id}, rank:{rank}" );
						_matchingSystems[0].CreateUser( id, rank );
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
