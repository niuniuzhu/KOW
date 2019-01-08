using System.Collections.Generic;

namespace Core.FiniteStateMachine
{
	public class FSM
	{
		protected readonly Dictionary<int, FSMState> _typeToState = new Dictionary<int, FSMState>();
		protected readonly List<FSMState> _states = new List<FSMState>();

		public FSMState currentState { get; protected set; }
		public FSMState previousState { get; protected set; }
		public FSMState globalState { get; protected set; }

		/// <summary>
		/// 添加状态
		/// </summary>
		public bool AddState( FSMState state )
		{
			if ( this._typeToState.ContainsKey( state.type ) )
				return false;
			this._typeToState[state.type] = state;
			this._states.Add( state );
			return true;
		}

		/// <summary>
		/// 移除状态
		/// </summary>
		public bool RemoveState( int type )
		{
			if ( !this._typeToState.TryGetValue( type, out FSMState state ) )
			{
				return false;
			}
			this._states.Remove( state );
			this._typeToState.Remove( type );
			return true;
		}

		/// <summary>
		/// 是否存在指定类型的状态
		/// </summary>
		public bool HasState( int type ) => this._typeToState.ContainsKey( type );

		public FSMState GetState( int type )
		{
			this._typeToState.TryGetValue( type, out FSMState state );
			return state;
		}

		/// <summary>
		/// 离开状态
		/// </summary>
		public bool ExitState( int type )
		{
			if ( !this._typeToState.TryGetValue( type, out FSMState state ) )
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
			if ( !this._typeToState.TryGetValue( type, out FSMState state ) )
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
			this.globalState?.Update( dt );
			this.currentState?.Update( dt );
		}
	}
}