namespace Core.FiniteStateMachine
{
	public abstract class FSMState
	{
		/// <summary>
		/// 状态类型
		/// </summary>
		public int type { get; }

		/// <summary>
		/// 构造函数
		/// </summary>
		/// <param name="type">状态类型</param>
		public FSMState( int type )
		{
			this.type = type;
		}

		/// <summary>
		/// 进入状态
		/// </summary>
		/// <param name="param">携带参数</param>
		public void Enter( object param ) => this.OnEnter( param );

		/// <summary>
		/// 离开状态
		/// </summary>
		public void Exit() => this.OnExit();

		public void Update( long dt ) => this.OnUpdate( dt );

		protected void OnEnter( object param )
		{
		}

		protected void OnExit()
		{
		}

		protected void OnUpdate( long dt )
		{
		}
	}
}