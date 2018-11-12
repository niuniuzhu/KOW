using Core.Misc;
using Shared;
using System;
using System.Diagnostics;
using System.Threading;

namespace Shell
{
	static class Program
	{
		private static InputHandler _inputHandler;
		private static bool _disposed;
		private static Shell _shell;

		static void Main( string[] args )
		{
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
