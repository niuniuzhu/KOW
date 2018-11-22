using Core.Misc;
using Shared;
using System;
using System.Diagnostics;
using System.Threading;

namespace Shell
{
	static class Program
	{
		//class TT
		//{
		//	public uint k;
		//}
		private static InputHandler _inputHandler;
		private static bool _disposed;
		private static Shell _shell;

		static void Main( string[] args )
		{
			//List<TT> tts = new List<TT>
			//{
			//	new TT { k = 0 },
			//	new TT { k = 0 },
			//	new TT { k = 3 },
			//	new TT { k = 3 },
			//	new TT { k = 3 },
			//	new TT { k = 4 },
			//	new TT { k = 2 },
			//	new TT { k = 2 },
			//	new TT { k = 1 }
			//};
			//var group = tts.GroupBy( tt => tt.k );
			//Console.WriteLine( group.Count() );
			//IGrouping<uint, TT> maxGroup = null;
			//int max = 0;
			//foreach ( var e in group )
			//{
			//	int count = e.Count();
			//	if ( count <= max )
			//		continue;
			//	maxGroup = e;
			//	max = count;
			//}
			//Console.WriteLine( maxGroup.Key );
			//Console.WriteLine( maxGroup.Count() );
			//Console.ReadLine();

			Console.Title = "Shell";

			Logger.Init();

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			_shell = new Shell();

			MainLoop();
			_inputHandler.Stop();
		}

		private static void Dispose()
		{
			_disposed = true;
		}

		private static void MainLoop()
		{
			Stopwatch sw = new Stopwatch();
			sw.Start();
			long lastElapsed = 0;
			while ( !_disposed )
			{
				long elapsed = sw.ElapsedMilliseconds;
				_shell.Update( elapsed, elapsed - lastElapsed );
				_inputHandler.ProcessInput();
				lastElapsed = elapsed;
				Thread.Sleep( Consts.HEART_BEAT_CD_TICK );
			}
		}

		private static void HandleInput( string cmd )
		{
			switch ( cmd )
			{
				case "exit":
					Dispose();
					return;

				case "cls":
					Console.Clear();
					return;
			}
			_shell.HandleInput( cmd );
		}
	}
}
