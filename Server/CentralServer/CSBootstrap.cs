using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using CommandLine;

namespace CentralServer
{
	static class CSBootstrap
	{
		private static bool _disposed;
		private static InputHandler _inputHandler;

		static void Main( string[] args ) => Parser.Default.ParseArguments<Options>( args ).WithParsed( Start ).WithNotParsed( errs => { } );

		private static void Start( Options opts )
		{
			Console.Title = "CS";

			string logCfg;
			try
			{
				logCfg = File.ReadAllText( opts.logCfg );
			}
			catch ( Exception e )
			{
				Logger.Error( $"Logger config file load failed,error:{e}" );
				return;
			}
			Logger.Init( logCfg, "CS" );

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			ErrorCode eResult = CS.instance.Initialize( opts );
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Initialize CS fail, error code:{eResult}" );
				return;
			}
			Logger.Info( "CS Initialize success" );

			eResult = CS.instance.Start();
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Start CS fail, error code:{eResult}" );
				return;
			}

			MainLoop();
			_inputHandler.Stop();
		}

		private static void Dispose()
		{
			_disposed = true;
			NetworkMgr.instance.Dispose();
			NetSessionPool.instance.Dispose();
		}

		private static void MainLoop()
		{
			Stopwatch sw = new Stopwatch();
			sw.Start();
			long lastElapsed = 0;
			while ( !_disposed )
			{
				long elapsed = sw.ElapsedMilliseconds;
				CS.instance.Update( elapsed, elapsed - lastElapsed );
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

					break;
				case "cls":
					Console.Clear();
					break;
			}
		}
	}
}
