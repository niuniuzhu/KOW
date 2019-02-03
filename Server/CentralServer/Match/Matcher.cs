using System;
using System.Collections.Generic;

namespace CentralServer.Match
{
	/// <summary>
	/// 匹配器
	/// </summary>
	public class Matcher
	{
		/// <summary>
		/// 搜索空间
		/// </summary>
		private readonly List<Grading> _searchSpace = new List<Grading>();
		/// <summary>
		/// 当前层级的超时时间
		/// </summary>
		private long _expireTime;
		/// <summary>
		/// 搜索时间
		/// </summary>
		private long _time;
		/// <summary>
		/// 当前匹配层级
		/// </summary>
		private int _level;
		/// <summary>
		/// 等候室
		/// </summary>
		private readonly MatchingLounge _matchingLounge;
		/// <summary>
		/// 用于随机选取扩大的分段
		/// </summary>
		private readonly Random _rnd = new Random();

		private readonly Grading _owner;

		public Matcher( Grading owner )
		{
			this._owner = owner;
			this._matchingLounge = new MatchingLounge( this._owner.system.numUsers );
			this.ExtendSearchGrading( owner );
		}

		/// <summary>
		/// 重置属性,匹配成功后调用
		/// </summary>
		private void Clear()
		{
			this._matchingLounge.Clear();
			this._searchSpace.RemoveRange( 1, this._searchSpace.Count - 1 );
			this._level = 1;
			this._time = 0;
		}

		internal MatchState ProcessMatch( long dt )
		{
			int count = this._searchSpace.Count;
			if ( count == 0 )
				return null;

			Grading grading = null;
			for ( int i = 0; i < count; i++ )
			{
				//搜索第i层
				grading = this._searchSpace[i];
				int numUsers = grading.system.numUsers;
				int c2 = grading.users.Count;
				for ( int j = 0; j < c2; j++ )
				{
					MatchUser user = grading.users[j];
					//添加到等候室
					if ( this._matchingLounge.AddUser( user ) )
					{
						//添加事件
						this._owner.system.CreateEvent( MatchUserEvent.Type.AddToCandidate, user, user.lounge.GetState() );

						if ( this._matchingLounge.numUsers == numUsers )
						{
							//匹配成功
							MatchState state =  this._matchingLounge.GetState();
							this.Clear();
							return state;
						}
					}
				}
			}

			//超过搜索时间,扩大搜索空间
			if ( this._time >= this._expireTime && this._searchSpace.Count <= grading.maxExtends )
			{
				grading = this._searchSpace[0];
				Grading prev = null, next = null;
				//找到需要扩展的分段
				for ( int i = 0; i < this._level; i++ )
				{
					prev = grading.prev;
					if ( prev == null )
						break;
				}
				for ( int i = 0; i < this._level; i++ )
				{
					next = grading.next;
					if ( next == null )
						break;
				}
				if ( prev != null && next != null )
				{
					//随机顺序加入到搜索空间
					double rnd = this._rnd.NextDouble();
					if ( rnd < 0.5 )
					{
						this.ExtendSearchGrading( prev );
						this.ExtendSearchGrading( next );
					}
					else
					{
						this.ExtendSearchGrading( next );
						this.ExtendSearchGrading( prev );
					}
				}
				else if ( prev != null || next != null )
					this.ExtendSearchGrading( prev ?? next );
			}
			this._time += dt;
			return null;
		}

		/// <summary>
		/// 添加一个搜索分段
		/// </summary>
		private void ExtendSearchGrading( Grading grading )
		{
			this._searchSpace.Add( grading );
			this._expireTime = grading.expireTime;
			this._time = 0;
			++this._level;
		}
	}
}