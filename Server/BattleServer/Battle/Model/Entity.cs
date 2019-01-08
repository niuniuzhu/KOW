using System.Collections;
using Core.FMath;
using Google.Protobuf;

namespace BattleServer.Battle.Model
{
	public abstract class Entity
	{
		public Battle battle { get; }

		public ulong rid;
		public int id;
		public bool markToDestroy;

		public FVec2 position;
		public FVec2 direction;

		protected Hashtable _defs;

		protected Entity( Battle battle )
		{
			this.battle = battle;
		}

		public void Dispose()
		{
			//暂时没有非托管资源
		}

		protected abstract void LoadDefs();

		protected virtual void OnInit()
		{
		}

		/// <summary>
		/// 解码快照
		/// </summary>
		public virtual void DecodeSnapshot( ulong rid, bool isNew, CodedInputStream reader )
		{
			this.rid = rid;
			this.id = reader.ReadInt32();
			if ( isNew )
			{
				this.LoadDefs();
				this.OnInit();
			}
			this.markToDestroy = reader.ReadBool();
			this.position = new FVec2( ( Fix64 )reader.ReadDouble(), ( Fix64 )reader.ReadDouble() );
			this.direction = new FVec2( ( Fix64 )reader.ReadDouble(), ( Fix64 )reader.ReadDouble() );
		}
	}
}