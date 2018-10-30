using System.Text.RegularExpressions;

namespace Shared
{
	public static class Consts
	{
		/// <summary>
		/// 线程睡眠时长
		/// </summary>
		public const int HEART_BEAT_CD_TICK = 1;

		/// <summary>
		/// 心跳时间间隔
		/// </summary>
		public const long HEART_BEAT_INTERVAL = 100;

		/// <summary>
		/// 重连检测的时间间隔
		/// </summary>
		public const long RECONN_INTERVAL = 2000;

		/// <summary>
		/// RPC超时时间
		/// </summary>
		public const int RPC_TIMEOUT = 5000;

		/// <summary>
		/// 用户名最小长度
		/// </summary>
		public const int DEFAULT_UNAME_MIN_LEN = 3;

		/// <summary>
		/// 用户名最大长度
		/// </summary>
		public const int DEFAULT_UNAME_MAX_LEN = 10;

		/// <summary>
		/// 密码最小长度
		/// </summary>
		public const int DEFAULT_PWD_MIN_LEN = 3;

		/// <summary>
		/// 密码最大长度
		/// </summary>
		public const int DEFAULT_PWD_MAX_LEN = 16;

		/// <summary>
		/// 密码的正则匹配规则
		/// </summary>
		public static readonly Regex REGEX_PWD = new Regex( @"" );

		/// <summary>
		/// 房间超时时间
		/// </summary>
		public const long ROOM_TIME_OUT = 5000;

		/// <summary>
		/// 连接BS超时时间
		/// </summary>
		public const long WAITING_ROOM_TIME_OUT = 5000;

		/// <summary>
		/// 通知客户端房间内所有玩家的信息
		/// </summary>
		public const long NOTIFY_PLAYERINFO_INTERVAL = 1000;
	}

	public enum ErrorCode
	{
		Success,
		Failed,
		//config
		CfgLoadFailed,
		DefsLoadFailed,
		DBCfgLoadFailed,
		//db
		InvalidDatabase,
		SqlExecError,
		EncodeMsgToBufferFailed,
		RedisReplyNil,
		ConnectToRedisFailed,
		//register
		UsernameExists,
		InvalidUname,
		InvalidPwd,
		InvalidGcNID,
		InvalidGsNID,
		MaximumUsers,
		DuplicateGCNID
	}

	public class GSInfo
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint lid;
		public uint sessionID;
		public string name;
		public string ip;
		public int port;
		public string password;
		public State state;

		public override string ToString() => $"lid:{this.lid},sessionID:{this.sessionID},state:{this.state}";
	}

	public class BSInfo
	{
		public enum State
		{
			Free,
			Busy,
			Full,
			Close
		}
		public uint lid;
		public uint sessionID;
		public string ip;
		public int port;
		public State state;

		public override string ToString() => $"lid:{this.lid},sessionID:{this.sessionID},state:{this.state}";
	}

	public enum UserPlatform
	{
		//ios
		PC = 0,
		IOS_91 = 1,
		IOS_TB = 2,
		IOS_PP = 3,
		IOS_CMGE = 4,
		IOS_UC = 5,
		IOS_iTools = 6,
		OnlineGame = 7,
		IOS_As = 8,
		IOS_XY = 9,
		IOS_CMGE_ZB = 10,
		//android
		AndroidCMGE = 104,
		AndroidUC = 105,
		//other
		PlatformiOS_CMGEInfo = 304,

		All = int.MaxValue
	}
}