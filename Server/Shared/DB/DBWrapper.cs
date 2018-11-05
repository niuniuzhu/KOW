using Core.Misc;
using MySql.Data.MySqlClient;
using System;

namespace Shared.DB
{
	public delegate ErrorCode SqlExecQueryHandler( MySqlDataReader dataReader );

	public class DBWrapper
	{
		/// <summary>
		/// Native MySQL connection
		/// </summary>
		private MySqlConnection _db;

		/// <summary>
		/// 连接数据库
		/// </summary>
		/// <param name="ip"></param>
		/// <param name="port"></param>
		/// <param name="pwd"></param>
		/// <param name="uname"></param>
		/// <param name="dbname"></param>
		public void Start( string ip, int port, string pwd, string uname, string dbname )
		{
			this._db = new MySqlConnection( $"server={ip};user id={uname};password={pwd};port={port};database={dbname}" );
		}

		/// <summary>
		/// 断开数据库的连接
		/// </summary>
		public void Stop()
		{
		}

		/// <summary>
		/// 执行查询指令
		/// </summary>
		/// <param name="command">sql指令</param>
		/// <param name="handler">查询结果的回调函数</param>
		/// <returns>错误信息</returns>
		public ErrorCode SqlExecQuery( string command, SqlExecQueryHandler handler )
		{
			if ( null == this._db )
			{
				Logger.Warn( "invalid db" );
				return ErrorCode.InvalidDatabase;
			}

			MySqlCommand sqlCmd = this._db.CreateCommand();
			MySqlDataReader dataReader = null;
			try
			{
				this._db.Open();
				sqlCmd.CommandText = command;
				sqlCmd.ExecuteNonQuery();
				dataReader = sqlCmd.ExecuteReader();
			}
			catch ( Exception e )
			{
				Logger.Warn( $"sql:{sqlCmd.CommandText} execute error:{e}" );
				dataReader?.Close();
				this._db.Close();
				return ErrorCode.SqlExecError;
			}

			ErrorCode errorCode = ErrorCode.Success;
			if ( handler != null )
				errorCode = handler.Invoke( dataReader );

			dataReader?.Close();
			this._db.Close();
			return errorCode;
		}

		/// <summary>
		/// 执行查询指令
		/// </summary>
		/// <param name="command">sql指令</param>
		/// <param name="rows">影响的行数</param>
		/// <returns>错误信息</returns>
		public ErrorCode SqlExecNonQuery( string command, out int rows, out uint id )
		{
			rows = 0;
			id = 0;
			if ( null == this._db )
			{
				Logger.Warn( "invalid db" );
				return ErrorCode.InvalidDatabase;
			}

			MySqlCommand sqlCmd = this._db.CreateCommand();
			try
			{
				this._db.Open();
				sqlCmd.CommandText = command;
				rows = sqlCmd.ExecuteNonQuery();
				id = ( uint ) sqlCmd.LastInsertedId;
			}
			catch ( Exception e )
			{
				Logger.Warn( $"sql:{sqlCmd.CommandText} execute error:{e}" );
				return ErrorCode.SqlExecError;
			}
			finally
			{
				this._db.Close();
			}
			return ErrorCode.Success;
		}

		/// <summary>
		/// 执行连串查询指令
		/// </summary>
		/// <param name="commands">sql指令集合</param>
		/// <returns>错误信息</returns>
		public ErrorCode SqlExecNonQuery( string[] commands )
		{
			if ( null == this._db )
			{
				Logger.Warn( "invalid db" );
				return ErrorCode.InvalidDatabase;
			}

			MySqlCommand sqlCmd = this._db.CreateCommand();
			try
			{
				this._db.Open();
				foreach ( string command in commands )
				{
					sqlCmd.CommandText = command;
					sqlCmd.ExecuteNonQuery();
				}
			}
			catch ( Exception e )
			{
				Logger.Warn( $"sql:{sqlCmd.CommandText} execute error:{e}" );
				return ErrorCode.SqlExecError;
			}
			finally
			{
				this._db.Close();
			}
			return ErrorCode.Success;
		}
	}
}