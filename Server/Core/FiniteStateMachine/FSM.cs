using System.Collections.Generic;

namespace Core.FiniteStateMachine
{
	public class FSM
	{
		private readonly Dictionary<int, FSMState> _stateMap = new Dictionary<int, FSMState>();
		public FSMState currentState { get; private set; }
		public FSMState previousState { get; private set; }
		public FSMState globalState { get; set; }

		/// <summary>
		/// 添加状态
		/// </summary>
		public bool AddState( FSMState state )
		{
			if ( this._stateMap.ContainsKey( state.type ) )
				return false;
			this._stateMap[state.type] = state;
			return true;
		}

		/// <summary>
		/// 移除状态
		/// </summary>
		public bool RemoveState( int type )
		{
			return this._stateMap.Remove( type );
		}
		
		/// <summary>
		/// 是否存在指定类型的状态
		/// </summary>
		public bool HasState( int type )
		{
			return this._stateMap.ContainsKey( type );
		}

		/// <summary>
		/// 离开状态
		/// </summary>
		public bool ExitState( int type )
		{
			if ( !this._stateMap.TryGetValue( type, out FSMState state ) )
				return false;
			state.Exit();
			return true;
		}

		/// <summary>
		/// 改变状态
		/// </summary>
		/// <param name="type">状态类型</param>
		/// <param name="param">携带参数</param>
		/// <param name="force">如果当前处于同一状态,是否强制转换</param>
		/// <returns>是否成功转换状态</returns>
		public bool ChangeState( int type, object param = null, bool force = false )
		{
			if ( !this._stateMap.TryGetValue( type, out FSMState state ) )
				return false;

			if ( this.currentState != null )
			{
				if ( !force && this.currentState.type == type )
					return false;
				this.currentState.Exit();
				this.previousState = this.currentState;
				this.currentState = null;
			}

			this.currentState = state;
			this.currentState.Enter( param );
			return true;
		}

		public void Update( long dt )
		{
			if ( this.globalState != null )
				this.globalState.Update( dt );
			if ( this.currentState != null )
				this.currentState.Update( dt );
		}
	}
}