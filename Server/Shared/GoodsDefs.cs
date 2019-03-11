using System.Collections;
using System.Text;
using System.Text.RegularExpressions;
using Core.Misc;
using Google.Protobuf;

namespace Shared
{
    public static class GoodsDefs
    {
        private static readonly Regex REGEX = new Regex( @"/\*+[^\*]*\*+/" );

        private const string DEFS_CHAMPION_PREFIX = "e";

        private static readonly Hashtable _defs = new Hashtable();

        public static ByteString binary { get; private set; }

        public static void Load( string json )
        {
            json = REGEX.Replace( json, string.Empty );
            Hashtable defs = ( Hashtable )MiniJSON.JsonDecode( json );
            _defs.Clear();
            foreach ( DictionaryEntry de in defs )
                _defs[de.Key] = de.Value;
            binary = ByteString.CopyFrom( json, Encoding.UTF8 );
        }

	    public static Hashtable GetGlobal() => _defs.GetMap( "global" );

        public static Hashtable GetChampion( int id ) => _defs.GetMap( "champions" ).GetMap( DEFS_CHAMPION_PREFIX + id );
    }
}