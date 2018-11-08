using Core.Misc;
using Core.Net;
using Shared;
using Shared.Net;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using CommandLine;

namespace GateServer
{
	static class GSBootstrap
	{
		private static bool _disposed;
		private static InputHandler _inputHandler;

		static void Main( string[] args ) => Parser.Default.ParseArguments<Options>( args ).WithParsed( Start ).WithNotParsed( errs => { } );

		private static void Start( Options opts )
		{
			Console.Title = "GS";
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
			Logger.Init( logCfg, "GS" );

			_inputHandler = new InputHandler { cmdHandler = HandleInput };
			_inputHandler.Start();

			ErrorCode eResult = GS.instance.Initialize( opts );
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Initialize GS fail,error code:{eResult}" );
				return;
			}
			Logger.Info( "GS Initialize success" );

			eResult = GS.instance.Start();
			if ( ErrorCode.Success != eResult )
			{
				Logger.Error( $"Start GS fail, error code:{eResult}" );
				return;
			}

			MainLoop();
			_inputHandler.Stop();
		}

		private static void Dispose()
		{
			_disposed = true;
			GS.instance.Dispose();
		}

		private static void MainLoop()
		{
			Stopwatch sw = new Stopwatch();
			sw.Start();
			long lastElapsed = 0;
			while ( !_disposed )
			{
				long elapsed = sw.ElapsedMilliseconds;
				GS.instance.Update( elapsed, elapsed - lastElapsed );
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
			string[] strs = cmd.Split( ' ' );
			if ( strs[0] == "call" )
				GS.instance.HandleLuaCall( strs[1] );
			else if ( strs[0] == "print" )
				GS.instance.HandleLuaPrint( strs[1] );
		}
	}
}
