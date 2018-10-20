using System.Collections;
using System.Collections.Generic;

namespace Core.Misc
{
	public static class DictionaryHelper
	{
		public static void Copy( this IDictionary a, IDictionary b )
		{
			foreach ( DictionaryEntry de in a )
				b[de.Key] = de.Value;
		}

		public static void GetOrCreate<T1, T2>( this Dictionary<T1, T2> dict, T1 key, out T2 value ) where T2 : new()
		{
			if ( !dict.TryGetValue( key, out T2 v ) )
			{
				v = new T2();
				dict[key] = v;
			}
			value = v;
		}

		public static void AddToList<T1, T2>( this Dictionary<T1, List<T2>> dict, T1 key, T2 value )
		{
			if ( !dict.TryGetValue( key, out List<T2> list ) )
			{
				list = new List<T2>();
				dict[key] = list;
			}
			list.Add( value );
		}

		public static void RemoveFromList<T1, T2>( this Dictionary<T1, List<T2>> dict, T1 key, T2 value )
		{
			if ( !dict.TryGetValue( key, out List<T2> list ) )
				return;
			if ( list.Remove( value ) && list.Count == 0 )
				dict.Remove( key );
		}
	}
}