define(["require", "exports", "../../Consts", "../../Global", "../../RC/FSM/FSM", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../Attribute", "../FSM/VEntityState"], function (require, exports, Consts_1, Global_1, FSM_1, Vec2_1, Hashtable_1, Attribute_1, VEntityState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this._position = Vec2_1.Vec2.zero;
            this._direction = Vec2_1.Vec2.zero;
            this._logicPos = Vec2_1.Vec2.zero;
            this._logicDir = Vec2_1.Vec2.zero;
            this._fsm = new FSM_1.FSM();
            this._root = new fairygui.GComponent();
            this._roleAni = new Laya.Animation();
            this._roleAni.autoSize = true;
            this._roleAni.autoPlay = true;
            this._roleAni.interval = 100;
            this._root.setPivot(0.5, 0.5, true);
            Global_1.Global.graphic.entityRoot.addChild(this._root);
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Idle, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Move, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Attack, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Die, this));
        }
        get id() { return this._id; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        get position() { return this._position; }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            const delta = Vec2_1.Vec2.Sub(value, this._position);
            this._position = value;
            this.OnPositionChanged(delta);
        }
        get direction() { return this._direction; }
        set direction(value) {
            if (this._direction.EqualsTo(value))
                return;
            const delta = Vec2_1.Vec2.Sub(value, this._direction);
            this._direction = value;
            this.OnDirectionChanged(delta);
        }
        Init(id, battle) {
            this._id = id;
            this._battle = battle;
            this._fsm.ChangeState(VEntityState_1.VEntityState.Type.Idle);
        }
        Dispose() {
            this._roleAni.destroy();
            this._root.dispose();
        }
        OnPositionChanged(delta) {
            this._root.setXY(this._position.x, this._position.y);
        }
        OnDirectionChanged(delta) {
        }
        InitSnapshot(reader) {
            this._actorID = reader.int32();
            this._team = reader.int32();
            this._name = reader.string();
            this.position = new Vec2_1.Vec2(reader.float(), reader.float());
            this.direction = new Vec2_1.Vec2(reader.float(), reader.float());
            this._fsm.ChangeState(reader.int32(), null, true);
            this._fsm.currentState.time = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), reader.float());
            }
            this._def = Laya.loader.getRes("res/roles/" + Consts_1.Consts.ASSETS_ENTITY_PREFIX + this._actorID + ".config.json");
            this.PlayAnim("stand");
            const holder = new fairygui.GGraph();
            holder.setNativeObject(this._roleAni);
            this._root.addChild(holder);
        }
        DecodeSnapshot(reader) {
        }
        PlayAnim(name) {
            const aniDef = Hashtable_1.Hashtable.GetMap(this._def, "animations");
            const group = Hashtable_1.Hashtable.GetMap(aniDef, name);
            const length = Hashtable_1.Hashtable.GetNumber(group, "length");
            const urls = [];
            for (let i = 0; i < length; ++i) {
                urls.push((Consts_1.Consts.ASSETS_ENTITY_PREFIX + this._actorID) + "/" + name + i + ".png");
            }
            this._roleAni.loadImages(urls);
            this._root.setSize(this._roleAni.width, this._roleAni.height);
        }
    }
    exports.VEntity = VEntity;
});
//# sourceMappingURL=VEntity.js.map