using log4net;
using log4net.Core;
using System;

namespace Core.Misc
{

	public class ConsoleLogger : ILog
	{
		public ILogger Logger { get; }

		public ConsoleLogger( string repository, string name )
		{
			//this.Logger = LogManager.GetLogger( repository, name );
		}

		public void Debug( object message )
		{
			Console.WriteLine( message );
		}

		public void Debug( object message, Exception exception )
		{
			Console.WriteLine( $"{exception}:{Environment.NewLine}{message}" );
		}

		public void DebugFormat( string format, params object[] args )
		{
			Console.WriteLine( format, args );
		}

		public void DebugFormat( string format, object arg0 )
		{
			Console.WriteLine( format, arg0 );
		}

		public void DebugFormat( string format, object arg0, object arg1 )
		{
			Console.WriteLine( format, arg0, arg1 );
		}

		public void DebugFormat( string format, object arg0, object arg1, object arg2 )
		{
			Console.WriteLine( format, arg0, arg1, arg2 );
		}

		public void DebugFormat( IFormatProvider provider, string format, params object[] args )
		{
			Console.WriteLine( string.Format( provider, format, args ) );
		}

		public void Info( object message )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( message );
			Console.ForegroundColor = oldColor;
		}

		public void Info( object message, Exception exception )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( $"{exception}:{Environment.NewLine}{message}" );
			Console.ForegroundColor = oldColor;
		}

		public void InfoFormat( string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( format, args );
			Console.ForegroundColor = oldColor;
		}

		public void InfoFormat( string format, object arg0 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( format, arg0 );
			Console.ForegroundColor = oldColor;
		}

		public void InfoFormat( string format, object arg0, object arg1 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( format, arg0, arg1 );
			Console.ForegroundColor = oldColor;
		}

		public void InfoFormat( string format, object arg0, object arg1, object arg2 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( format, arg0, arg1, arg2 );
			Console.ForegroundColor = oldColor;
		}

		public void InfoFormat( IFormatProvider provider, string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkGreen;
			Console.WriteLine( string.Format( provider, format, args ) );
			Console.ForegroundColor = oldColor;
		}

		public void Warn( object message )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( message );
			Console.ForegroundColor = oldColor;
		}

		public void Warn( object message, Exception exception )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( $"{exception}:{Environment.NewLine}{message}" );
			Console.ForegroundColor = oldColor;
		}

		public void WarnFormat( string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( format, args );
			Console.ForegroundColor = oldColor;
		}

		public void WarnFormat( string format, object arg0 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( format, arg0 );
			Console.ForegroundColor = oldColor;
		}

		public void WarnFormat( string format, object arg0, object arg1 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( format, arg0, arg1 );
			Console.ForegroundColor = oldColor;
		}

		public void WarnFormat( string format, object arg0, object arg1, object arg2 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( format, arg0, arg1, arg2 );
			Console.ForegroundColor = oldColor;
		}

		public void WarnFormat( IFormatProvider provider, string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkYellow;
			Console.WriteLine( string.Format( provider, format, args ) );
			Console.ForegroundColor = oldColor;
		}

		public void Error( object message )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( message );
			Console.ForegroundColor = oldColor;
		}

		public void Error( object message, Exception exception )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( $"{exception}:{Environment.NewLine}{message}" );
			Console.ForegroundColor = oldColor;
		}

		public void ErrorFormat( string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, args );
			Console.ForegroundColor = oldColor;
		}

		public void ErrorFormat( string format, object arg0 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, arg0 );
			Console.ForegroundColor = oldColor;
		}

		public void ErrorFormat( string format, object arg0, object arg1 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, arg0, arg1 );
			Console.ForegroundColor = oldColor;
		}

		public void ErrorFormat( string format, object arg0, object arg1, object arg2 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, arg0, arg1, arg2 );
			Console.ForegroundColor = oldColor;
		}

		public void ErrorFormat( IFormatProvider provider, string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( string.Format( provider, format, args ) );
			Console.ForegroundColor = oldColor;
		}

		public void Fatal( object message )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( message );
			Console.ForegroundColor = oldColor;
		}

		public void Fatal( object message, Exception exception )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( $"{exception}:{Environment.NewLine}{message}" );
			Console.ForegroundColor = oldColor;
		}

		public void FatalFormat( string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, args );
			Console.ForegroundColor = oldColor;
		}

		public void FatalFormat( string format, object arg0 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, arg0 );
			Console.ForegroundColor = oldColor;
		}

		public void FatalFormat( string format, object arg0, object arg1 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, arg0, arg1 );
			Console.ForegroundColor = oldColor;
		}

		public void FatalFormat( string format, object arg0, object arg1, object arg2 )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( format, arg0, arg1, arg2 );
			Console.ForegroundColor = oldColor;
		}

		public void FatalFormat( IFormatProvider provider, string format, params object[] args )
		{
			ConsoleColor oldColor = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkRed;
			Console.WriteLine( string.Format( provider, format, args ) );
			Console.ForegroundColor = oldColor;
		}

		public bool IsDebugEnabled => true;
		public bool IsInfoEnabled => true;
		public bool IsWarnEnabled => true;
		public bool IsErrorEnabled => true;
		public bool IsFatalEnabled => true;
	}
}