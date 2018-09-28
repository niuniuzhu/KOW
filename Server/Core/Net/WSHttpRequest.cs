using System;
using System.Collections.Generic;

namespace Core.Net
{
	public class WSHttpRequest
	{
		public string method;
		public string path;
		public string body;
		public string scheme;
		public byte[] bytes;
		public int size;
		public int offset;

		public string this[string name] => this.headers.TryGetValue( name, out string value ) ? value : string.Empty;

		public IDictionary<string, string> headers { get; } = new Dictionary<string, string>();

		public string[] subProtocols => this.headers.TryGetValue( "Sec-WebSocket-Protocol", out string value )
											? value.Split( new[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries )
											: new string[0];
	}
}