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
		public const int HEART_BEAT_INTERVAL = 100;

		/// <summary>
		/// 重连检测的时间间隔
		/// </summary>
		public const long RECONN_INTERVAL = 2000;

		public const int DEFAULT_UNAME_LEN = 3;

		public const int DEFAULT_PWD_LEN = 3;

		public const int ROOM_MAX_USER = 2;

		public static readonly Regex REGEX_PWD = new Regex( @"" );
	}

	public enum ErrorCode
	{
		Success,
		Failed,
		//config
		CfgLoadFailed,
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
		UserExists,
		LoginFailed,
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
		public uint id;
		public uint sessionID;
		public string name;
		public string ip;
		public int port;
		public string password;
		public State state;

		public override string ToString() => $"id:{this.id},name:{this.name},ip:{this.ip},port:{this.port},pwd:{this.password},state:{this.state}";
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
		public uint id;
		public string ip;
		public int port;
		public State state;

		public override string ToString() => $"id:{this.id},ip:{this.ip},port:{this.port},state:{this.state}";
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

	public struct UserNetInfo
	{
		public int gsID { get; private set; }
		public uint gcNetID { get; private set; }

		public UserNetInfo( int gsID, uint gcNetID )
		{
			this.gsID = gsID;
			this.gcNetID = gcNetID;
		}

		public void Clear()
		{
			this.gcNetID = 0;
			this.gsID = 0;
		}

		public bool IsValid()
		{
			return this.gcNetID > 0 && this.gsID > 0;
		}
	}
}