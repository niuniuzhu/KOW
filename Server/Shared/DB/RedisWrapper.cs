using System;
using System.Collections.Generic;
using System.Net;
using Core.Misc;
using StackExchange.Redis;
using System.Threading;
using System.Threading.Tasks;

namespace Shared.DB
{
	public class RedisWrapper
	{
		private enum State
		{
			Close,
			Connecting,
			Connected
		}

		public bool reconnectTag = false;

		private State _state;
		private ConnectionMultiplexer _connMultiplexer;
		private long _reconnectTime;
		private string _ip;
		private int _port;
		private string _password;
		private IDatabase _database;

		public bool IsConnected => this._connMultiplexer != null && this._connMultiplexer.IsConnected;

		public ErrorCode Connect( string ip, int port, string password )
		{
			this._ip = ip;
			this._port = port;
			this._password = password;
			return this.Reconnect();
		}

		private ErrorCode Reconnect()
		{
			this._state = State.Connecting;
			ConfigurationOptions redisConfig = new ConfigurationOptions
			{
				EndPoints = { { this._ip, this._port } },
				Password = this._password,
				KeepAlive = 180,
				AbortOnConnectFail = false
			};
			ConnectionMultiplexer.ConnectAsync( redisConfig )
								 .ContinueWith( ( task, _ ) =>
								 {
									 this._connMultiplexer = task.Result;
									 this._database = this._connMultiplexer.GetDatabase(); //redis集群只有一个db
									 if ( !this._connMultiplexer.IsConnected )
									 {
										 Logger.Log( $"redis connect error, address:{this._ip}:{this._port}" );
										 this._state = State.Close;
										 this._reconnectTime = TimeUtils.utcTime + Consts.RECONN_INTERVAL;
										 return;
									 }

									 Logger.Info( $"redis connect success, address:{this._ip}:{this._port}" );
									 this._state = State.Connected;
								 }, null, CancellationToken.None );
			return ErrorCode.Success;
		}

		public void OnHeartBeat( long dt )
		{
			if ( this._state != State.Close ||
				 !this.reconnectTag ||
				 TimeUtils.utcTime < this._reconnectTime )
				return;
			this.Reconnect();
		}

		#region async method

		public Task<RedisResult> ExecuteAsync( string command, ICollection<object> args,
											   CommandFlags flags = CommandFlags.None ) =>
			this._database.ExecuteAsync( command, args, flags );

		public Task<RedisResult> ExecuteAsync( string command, params object[] args ) =>
			this._database.ExecuteAsync( command, args );

		public Task<long> HashDecrementAsync( RedisKey key, RedisValue hashField, long value = 1,
											  CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDecrementAsync( key, hashField, value, flags );

		public Task<double> HashDecrementAsync( RedisKey key, RedisValue hashField, double value,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDecrementAsync( key, hashField, value, flags );

		public Task<bool> HashDeleteAsync( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDeleteAsync( key, hashField, flags );

		public Task<long> HashDeleteAsync( RedisKey key, RedisValue[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDeleteAsync( key, hashFields, flags );

		public Task<bool> HashExistsAsync( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashExistsAsync( key, hashField, flags );

		public Task<HashEntry[]> HashGetAllAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAllAsync( key, flags );

		public Task<RedisValue> HashGetAsync( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAsync( key, hashField, flags );

		public Task<RedisValue[]> HashGetAsync( RedisKey key, RedisValue[] hashFields,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAsync( key, hashFields, flags );

		public Task<double> HashIncrementAsync( RedisKey key, RedisValue hashField, double value,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashIncrementAsync( key, hashField, value, flags );

		public Task<long> HashIncrementAsync( RedisKey key, RedisValue hashField, long value = 1,
											  CommandFlags flags = CommandFlags.None ) =>
			this._database.HashIncrementAsync( key, hashField, value, flags );

		public Task<RedisValue[]> HashKeysAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashKeysAsync( key, flags );

		public Task<long> HashLengthAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashLengthAsync( key, flags );

		public Task HashSetAsync( RedisKey key, HashEntry[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashSetAsync( key, hashFields, flags );

		public Task<bool> HashSetAsync( RedisKey key, RedisValue hashField, RedisValue value, When when = When.Always,
										CommandFlags flags = CommandFlags.None ) =>
			this._database.HashSetAsync( key, hashField, value, when, flags );

		public Task<RedisValue[]> HashValuesAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashValuesAsync( key, flags );

		public Task<long> KeyDeleteAsync( RedisKey[] keys, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDeleteAsync( keys, flags );

		public Task<bool> KeyDeleteAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDeleteAsync( key, flags );

		public Task<byte[]> KeyDumpAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDumpAsync( key, flags );

		public Task<bool> KeyExistsAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExistsAsync( key, flags );

		public Task<bool> KeyExpireAsync( RedisKey key, TimeSpan? expiry, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExpireAsync( key, expiry, flags );

		public Task<bool> KeyExpireAsync( RedisKey key, DateTime? expiry, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExpireAsync( key, expiry, flags );

		public Task KeyMigrateAsync( RedisKey key, EndPoint toServer, int toDatabase = 0, int timeoutMilliseconds = 0,
									 MigrateOptions migrateOptions = MigrateOptions.None,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyMigrateAsync( key, toServer, toDatabase, timeoutMilliseconds, migrateOptions, flags );

		public Task<bool> KeyMoveAsync( RedisKey key, int database, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyMoveAsync( key, database, flags );

		public Task<bool> KeyPersistAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyPersistAsync( key, flags );

		public Task<RedisKey> KeyRandomAsync( CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRandomAsync( flags );

		public Task<bool> KeyRenameAsync( RedisKey key, RedisKey newKey, When when = When.Always,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRenameAsync( key, newKey, when, flags );

		public Task KeyRestoreAsync( RedisKey key, byte[] value, TimeSpan? expiry = null,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRestoreAsync( key, value, expiry, flags );

		public Task<TimeSpan?> KeyTimeToLiveAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyTimeToLiveAsync( key, flags );

		public Task<RedisType> KeyTypeAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyTypeAsync( key, flags );

		public Task<bool> SetAddAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetAddAsync( key, value, flags );

		public Task<long> SetAddAsync( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetAddAsync( key, values, flags );

		public Task<long> SetCombineAndStoreAsync( SetOperation operation, RedisKey destination, RedisKey first,
												   RedisKey second, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAndStoreAsync( operation, destination, first, second, flags );

		public Task<long> SetCombineAndStoreAsync( SetOperation operation, RedisKey destination, RedisKey[] keys,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAndStoreAsync( operation, destination, keys, flags );

		public Task<RedisValue[]> SetCombineAsync( SetOperation operation, RedisKey first, RedisKey second,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAsync( operation, first, second, flags );

		public Task<RedisValue[]> SetCombineAsync( SetOperation operation, RedisKey[] keys,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.SetCombineAsync( operation, keys, flags );

		public Task<bool> SetContainsAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetContainsAsync( key, value, flags );

		public Task<long> SetLengthAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetLengthAsync( key, flags );

		public Task<RedisValue[]> SetMembersAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetMembersAsync( key, flags );

		public Task<bool> SetMoveAsync( RedisKey source, RedisKey destination, RedisValue value,
										CommandFlags flags = CommandFlags.None ) =>
			this._database.SetMoveAsync( source, destination, value, flags );

		public Task<RedisValue> SetPopAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetPopAsync( key, flags );

		public Task<RedisValue> SetRandomMemberAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRandomMemberAsync( key, flags );

		public Task<RedisValue[]> SetRandomMembersAsync( RedisKey key, long count, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRandomMembersAsync( key, count, flags );

		public Task<bool> SetRemoveAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRemoveAsync( key, value, flags );

		public Task<long> SetRemoveAsync( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRemoveAsync( key, values, flags );

		public Task<long> StringAppendAsync( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringAppendAsync( key, value, flags );

		public Task<long> StringBitCountAsync( RedisKey key, long start = 0, long end = -1,
											   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitCountAsync( key, start, end, flags );

		public Task<long> StringBitOperationAsync( Bitwise operation, RedisKey destination, RedisKey[] keys,
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitOperationAsync( operation, destination, keys, flags );

		public Task<long> StringBitOperationAsync( Bitwise operation, RedisKey destination, RedisKey first,
												   RedisKey second = default( RedisKey ),
												   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitOperationAsync( operation, destination, first, second, flags );

		public Task<long> StringBitPositionAsync( RedisKey key, bool bit, long start = 0, long end = -1,
												  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitPositionAsync( key, bit, start, end, flags );

		public Task<long> StringDecrementAsync( RedisKey key, long value = 1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringDecrementAsync( key, value, flags );

		public Task<double> StringDecrementAsync( RedisKey key, double value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringDecrementAsync( key, value, flags );

		public Task StringGetAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetAsync( key, flags );

		public Task<RedisValue[]> StringGetAsync( RedisKey[] keys, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetAsync( keys, flags );

		public Task<long> StringIncrementAsync( RedisKey key, long value = 1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringIncrementAsync( key, value, flags );

		public Task<double> StringIncrementAsync( RedisKey key, double value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringIncrementAsync( key, value, flags );

		public Task<long> StringLengthAsync( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringLengthAsync( key, flags );

		public Task<bool> StringSetAsync( RedisKey key, RedisValue value, TimeSpan? expiry = null, When when = When.Always,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetAsync( key, value, expiry, when, flags );

		public Task<bool> StringSetAsync( KeyValuePair<RedisKey, RedisValue>[] values, When when = When.Always,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetAsync( values, when, flags );

		public Task<bool> StringSetBitAsync( RedisKey key, long offset, bool bit, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetBitAsync( key, offset, bit, flags );

		public Task<RedisValue> StringSetRangeAsync( RedisKey key, long offset, RedisValue value,
													 CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetRangeAsync( key, offset, value, flags );

		#endregion

		#region sync method

		public RedisResult Execute( string command, ICollection<object> args, CommandFlags flags = CommandFlags.None ) =>
			this._database.Execute( command, args, flags );

		public RedisResult Execute( string command, params object[] args ) => this._database.Execute( command, args );

		public long HashDecrement( RedisKey key, RedisValue hashField, long value = 1,
								   CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDecrement( key, hashField, value, flags );

		public double HashDecrement( RedisKey key, RedisValue hashField, double value,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDecrement( key, hashField, value, flags );

		public bool HashDelete( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDelete( key, hashField, flags );

		public long HashDelete( RedisKey key, RedisValue[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashDelete( key, hashFields, flags );

		public bool HashExists( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashExists( key, hashField, flags );

		public RedisValue[] HashGet( RedisKey key, RedisValue[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGet( key, hashFields, flags );

		public RedisValue HashGet( RedisKey key, RedisValue hashField, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGet( key, hashField, flags );

		public HashEntry[] HashGetAll( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashGetAll( key, flags );

		public double HashIncrement( RedisKey key, RedisValue hashField, double value,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.HashIncrement( key, hashField, value, flags );

		public long HashIncrement( RedisKey key, RedisValue hashField, long value = 1,
								   CommandFlags flags = CommandFlags.None ) =>
			this._database.HashIncrement( key, hashField, value, flags );

		public RedisValue[] HashKeys( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashKeys( key, flags );

		public long HashLength( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashLength( key, flags );

		public IEnumerable<HashEntry> HashScan( RedisKey key, RedisValue pattern, int pageSize, CommandFlags flags ) =>
			this._database.HashScan( key, pattern, pageSize, flags );

		public IEnumerable<HashEntry> HashScan( RedisKey key, RedisValue pattern = default( RedisValue ), int pageSize = 10,
												long cursor = 0, int pageOffset = 0,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.HashScan( key, pattern, pageSize, cursor, pageOffset, flags );

		public void HashSet( RedisKey key, HashEntry[] hashFields, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashSet( key, hashFields, flags );

		public bool HashSet( RedisKey key, RedisValue hashField, RedisValue value, When when = When.Always,
							 CommandFlags flags = CommandFlags.None ) =>
			this._database.HashSet( key, hashField, value, when, flags );

		public RedisValue[] HashValues( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.HashValues( key, flags );

		public bool KeyDelete( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDelete( key, flags );

		public long KeyDelete( RedisKey[] keys, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyDelete( keys, flags );

		public byte[] KeyDump( RedisKey key, CommandFlags flags = CommandFlags.None ) => this._database.KeyDump( key, flags );

		public bool KeyExists( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExists( key, flags );

		public bool KeyExpire( RedisKey key, TimeSpan? expiry, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExpire( key, expiry, flags );

		public bool KeyExpire( RedisKey key, DateTime? expiry, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyExpire( key, expiry, flags );

		public void KeyMigrate( RedisKey key, EndPoint toServer, int toDatabase = 0, int timeoutMilliseconds = 0,
								MigrateOptions migrateOptions = MigrateOptions.None,
								CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyMigrate( key, toServer, toDatabase, timeoutMilliseconds, migrateOptions, flags );

		public bool KeyMove( RedisKey key, int database, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyMove( key, database, flags );

		public bool KeyPersist( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyPersist( key, flags );

		public RedisKey KeyRandom( CommandFlags flags = CommandFlags.None ) => this._database.KeyRandom( flags );

		public bool KeyRename( RedisKey key, RedisKey newKey, When when = When.Always,
							   CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRename( key, newKey, when, flags );

		public void KeyRestore( RedisKey key, byte[] value, TimeSpan? expiry = null,
								CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyRestore( key, value, expiry, flags );

		public TimeSpan? KeyTimeToLive( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyTimeToLive( key, flags );

		public RedisType KeyType( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.KeyType( key, flags );

		public RedisValue ListGetByIndex( RedisKey key, long index, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListGetByIndex( key, index, flags );

		public long ListInsertAfter( RedisKey key, RedisValue pivot, RedisValue value,
									 CommandFlags flags = CommandFlags.None ) =>
			this._database.ListInsertAfter( key, pivot, value, flags );

		public long ListInsertBefore( RedisKey key, RedisValue pivot, RedisValue value,
									  CommandFlags flags = CommandFlags.None ) =>
			this._database.ListInsertBefore( key, pivot, value, flags );

		public RedisValue ListLeftPop( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListLeftPop( key, flags );

		public long ListLeftPush( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListLeftPush( key, values, flags );

		public long ListLeftPush( RedisKey key, RedisValue value, When when = When.Always,
								  CommandFlags flags = CommandFlags.None ) =>
			this._database.ListLeftPush( key, value, when, flags );

		public long ListLength( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListLength( key, flags );

		public RedisValue[] ListRange( RedisKey key, long start = 0, long stop = -1,
									   CommandFlags flags = CommandFlags.None ) =>
			this._database.ListRange( key, start, stop, flags );

		public long ListRemove( RedisKey key, RedisValue value, long count = 0, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListRemove( key, value, count, flags );

		public RedisValue ListRightPop( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListRightPop( key, flags );

		public RedisValue ListRightPopLeftPush( RedisKey source, RedisKey destination,
												CommandFlags flags = CommandFlags.None ) =>
			this._database.ListRightPopLeftPush( source, destination, flags );

		public long ListRightPush( RedisKey key, RedisValue value, When when = When.Always,
								   CommandFlags flags = CommandFlags.None ) =>
			this._database.ListRightPush( key, value, when, flags );

		public long ListRightPush( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListRightPush( key, values, flags );

		public void ListSetByIndex( RedisKey key, long index, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListSetByIndex( key, index, value, flags );

		public void ListTrim( RedisKey key, long start, long stop, CommandFlags flags = CommandFlags.None ) =>
			this._database.ListTrim( key, start, stop, flags );

		public long SetAdd( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetAdd( key, values, flags );

		public bool SetAdd( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetAdd( key, value, flags );

		public bool SetContains( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetContains( key, value, flags );

		public long SetLength( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetLength( key, flags );

		public RedisValue SetRandomMember( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRandomMember( key, flags );

		public RedisValue[] SetRandomMembers( RedisKey key, long count, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRandomMembers( key, count, flags );

		public long SetRemove( RedisKey key, RedisValue[] values, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRemove( key, values, flags );

		public bool SetRemove( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.SetRemove( key, value, flags );

		public long StringAppend( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringAppend( key, value, flags );

		public long StringBitCount( RedisKey key, long start = 0, long end = -1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitCount( key, start, end, flags );

		public long StringBitOperation( Bitwise operation, RedisKey destination, RedisKey[] keys,
										CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitOperation( operation, destination, keys, flags );

		public long StringBitOperation( Bitwise operation, RedisKey destination, RedisKey first,
										RedisKey second = default( RedisKey ), CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitOperation( operation, destination, first, second, flags );

		public long StringBitPosition( RedisKey key, bool bit, long start = 0, long end = -1,
									   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringBitPosition( key, bit, start, end, flags );

		public double StringDecrement( RedisKey key, double value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringDecrement( key, value, flags );

		public long StringDecrement( RedisKey key, long value = 1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringDecrement( key, value, flags );

		public RedisValue StringGet( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGet( key, flags );

		public RedisValue[] StringGet( RedisKey[] keys, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGet( keys, flags );

		public bool StringGetBit( RedisKey key, long offset, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetBit( key, offset, flags );

		public RedisValue StringGetRange( RedisKey key, long start, long end, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetRange( key, start, end, flags );

		public RedisValue StringGetSet( RedisKey key, RedisValue value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetSet( key, value, flags );

		public RedisValueWithExpiry StringGetWithExpiry( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringGetWithExpiry( key, flags );

		public long StringIncrement( RedisKey key, long value = 1, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringIncrement( key, value, flags );

		public double StringIncrement( RedisKey key, double value, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringIncrement( key, value, flags );

		public long StringLength( RedisKey key, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringLength( key, flags );

		public bool StringSet( RedisKey key, RedisValue value, TimeSpan? expiry = null, When when = When.Always,
							   CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSet( key, value, expiry, when, flags );

		public bool StringSet( KeyValuePair<RedisKey, RedisValue>[] values, When when = When.Always,
							   CommandFlags flags = CommandFlags.None ) => this._database.StringSet( values, when, flags );

		public bool StringSetBit( RedisKey key, long offset, bool bit, CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetBit( key, offset, bit, flags );

		public RedisValue StringSetRange( RedisKey key, long offset, RedisValue value,
										  CommandFlags flags = CommandFlags.None ) =>
			this._database.StringSetRange( key, offset, value, flags );

		#endregion
	}
}