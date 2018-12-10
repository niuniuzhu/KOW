using Core.Net;
using System.Security.Cryptography.X509Certificates;

namespace Shared.Net
{
	/// <summary>
	/// 作为服务端的session,通常是监听器接受连接后创建的session
	/// </summary>
	public abstract class SrvCliSession : NetSessionBase
	{
		protected SrvCliSession( uint id, ProtoType type, X509Certificate2 certificate ) : base( id, type, certificate )
		{
		}
	}
}