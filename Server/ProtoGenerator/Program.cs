using System;

namespace ProtoGenerator
{
	static class Program
	{
		static int Main( string[] args )
		{
			Parser parser = new Parser();
			string error = string.Empty;
			string wt = args[0];
			Parser.WriterType writerType;
			switch ( wt )
			{
				case "csharp":
					writerType = Parser.WriterType.CSharp;
					break;
				case "ts":
					writerType = Parser.WriterType.TS;
					break;
				default:
					Console.WriteLine( "invalid output type" );
					return -1;
			}
			parser.Parse( writerType, args[1], args[2], ref error );
			return 0;
		}
	}
}
