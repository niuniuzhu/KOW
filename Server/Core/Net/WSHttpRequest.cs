using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Net
{
	public class WSHttpRequest
	{
		public string method;
		public string path;
		public string body;

		public string this[string name] => this.headers.TryGetValue( name, out string value ) ? value : string.Empty;

		public IDictionary<string, string> headers { get; } = new Dictionary<string, string>();

		public string[] subProtocols => this.headers.TryGetValue( "Sec-WebSocket-Protocol", out string value )
											? value.Split( new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries )
											: new string[0];

		public override string ToString()
		{
			StringBuilder sb = new StringBuilder();
			foreach ( KeyValuePair<string, string> kv in this.headers )
				sb.AppendLine( $"{kv.Key}:{kv.Value}" );
			return $"method:{this.method}, path:{this.path}, body:{this.body}, headers:{sb}";
		}
	}
}