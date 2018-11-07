using Core.Math;
using log4net;
using log4net.Config;
using log4net.Core;
using log4net.Repository;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;

namespace Core.Misc
{
	/// <summary>
	/// 日志输出类
	/// </summary>
	public static class Logger
	{
		private static ILog _log;

		public static void Init( string config, string domain )
		{
			ILoggerRepository repository = LogManager.CreateRepository( "NETCoreRepository" );
			if ( !string.IsNullOrEmpty( config ) )
			{
				using ( var stream = GenerateStreamFromString( config ) )
					XmlConfigurator.Configure( repository, stream );
			}
			_log = LogManager.GetLogger( repository.Name, domain );
		}

		public static void Dispose() => LogManager.Shutdown();

		public static void Debug( object obj, int startFrame = 2, int count = 100 ) => _log.Debug( Stacks( ref obj, startFrame, count ) );

		public static void Log( object obj ) => _log.Log( obj );

		public static void Warn( object obj ) => _log.Warn( SimpleInfo( ref obj ) );

		public static void Error( object obj, int startFrame = 2, int count = 3 ) => _log.Error( Stacks( ref obj, startFrame, count ) );

		public static void Info( object obj ) => _log.Info( obj );

		public static void Fatal( object obj, int startFrame = 2, int count = 100 ) => _log.Fatal( Stacks( ref obj, startFrame, count ) );

		private static Stream GenerateStreamFromString( string s )
		{
			var stream = new MemoryStream();
			var writer = new StreamWriter( stream );
			writer.Write( s );
			writer.Flush();
			stream.Position = 0;
			return stream;
		}

		private static string SimpleInfo( ref object obj )
		{
			StackTrace st = new StackTrace( true );
			StackFrame sf = st.GetFrame( 2 );
			return $"[{sf.GetFileName()}:{sf.GetFileLineNumber()}] {obj}";
		}

		public static string Stacks( ref object obj, int startFrame, int count )
		{
			if ( count == 0 )
				return obj.ToString();
			StackTrace st = new StackTrace( true );
			int endFrame = MathUtils.Min( st.FrameCount, startFrame + count );
			if ( startFrame >= endFrame )
				return obj.ToString();

			StringBuilder sb = new StringBuilder();
			sb.Append( obj );
			for ( int i = startFrame; i < endFrame; i++ )
			{
				sb.AppendLine();
				StackFrame sf = st.GetFrame( i );
				MethodBase method = sf.GetMethod();
				sb.Append( $"\t{method.DeclaringType.FullName}::{method.Name}:{sf.GetFileLineNumber()},{sf.GetFileColumnNumber()}" );
			}
			return sb.ToString();
		}
	}

	public static class SpecialLogging
	{
		private static readonly Level specialLevel = new Level( 350, "LOG" );

		public static void Log( this ILog log, object message ) => log.Logger.Log( MethodBase.GetCurrentMethod().DeclaringType, specialLevel, message, null );
	}
}