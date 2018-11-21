define(["require", "exports", "../../Consts", "../CDefs", "../../Global", "../../RC/FSM/FSM", "../../RC/Math/MathUtils", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../Attribute", "./AniHolder", "./FSM/VEntityState", "./FSM/VIdle", "./FSM/VMove"], function (require, exports, Consts_1, CDefs_1, Global_1, FSM_1, MathUtils_1, Vec2_1, Hashtable_1, Attribute_1, AniHolder_1, VEntityState_1, VIdle_1, VMove_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this._position = Vec2_1.Vec2.zero;
            this._rotation = 0;
            this._worldPosition = Vec2_1.Vec2.zero;
            this._logicPos = Vec2_1.Vec2.zero;
            this._logicRot = 0;
            this._playingName = "";
            this._fsm = new FSM_1.FSM();
            this._root = new fairygui.GComponent();
            this._animations = new Map();
            this._root.setSize(0, 0);
            this._root.setPivot(0.5, 0.5, true);
            Global_1.Global.graphic.entityRoot.addChild(this._root);
            this._fsm.AddState(new VIdle_1.VIdle(VEntityState_1.VEntityState.Type.Idle, this));
            this._fsm.AddState(new VMove_1.VMove(VEntityState_1.VEntityState.Type.Move, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Attack, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Die, this));
        }
        get id() { return this._id; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        get root() { return this._root; }
        get position() { return this._position; }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            const delta = Vec2_1.Vec2.Sub(value, this._position);
            this._position = value;
            this.OnPositionChanged(delta);
        }
        get rotation() { return this._rotation; }
        set rotation(value) {
            if (this._rotation == value)
                return;
            const delta = value - this._rotation;
            this._rotation = value;
            this.OnRatationChanged(delta);
        }
        get worldPosition() { return this._worldPosition; }
        Init(id, battle) {
            this._id = id;
            this._battle = battle;
        }
        Dispose() {
            this._animations.forEach((v, k, map) => {
                v.dispose();
            });
            this._animations.clear();
            this._root.dispose();
        }
        Update(dt) {
            this.position = Vec2_1.Vec2.Lerp(this._position, this._logicPos, dt * 0.012);
            this.rotation = MathUtils_1.MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
        }
        OnPositionChanged(delta) {
            this._root.setXY(this._position.x, this._position.y);
            let point = new Laya.Point();
            this._root.localToGlobal(0, 0, point);
            this._worldPosition.x = point.x;
            this._worldPosition.y = point.y;
        }
        OnRatationChanged(delta) {
            this._root.rotation = this._rotation;
        }
        InitSnapshot(reader) {
            this._actorID = reader.int32();
            this._def = CDefs_1.CDefs.GetEntity(Consts_1.Consts.ASSETS_ENTITY_PREFIX + this._actorID);
            const aniDefs = Hashtable_1.Hashtable.GetMapArray(this._def, "animations");
            for (let i = 0; i < aniDefs.length; ++i) {
                const aniDef = aniDefs[i];
                const aniName = Hashtable_1.Hashtable.GetString(aniDef, "name");
                const length = Hashtable_1.Hashtable.GetNumber(aniDef, "length");
                const urls = [];
                for (let i = 0; i < length; ++i) {
                    urls.push((Consts_1.Consts.ASSETS_ENTITY_PREFIX + this._actorID) + "/" + aniName + i + ".png");
                }
                this._animations.set(aniName, new AniHolder_1.AniHolder(urls));
            }
            this._team = reader.int32();
            this._name = reader.string();
            this.position = new Vec2_1.Vec2(reader.float(), reader.float());
            this._logicPos.CopyFrom(this.position);
            const logicDir = new Vec2_1.Vec2(reader.float(), reader.float());
            this.rotation = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(Vec2_1.Vec2.down)));
            if (logicDir.x < 0)
                this.rotation = 360 - this.rotation;
            this._logicRot = this.rotation;
            this._fsm.ChangeState(reader.int32(), null);
            this._fsm.currentState.time = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), reader.float());
            }
        }
        DecodeSnapshot(reader) {
            this._actorID = reader.int32();
            this._team = reader.int32();
            this._name = reader.string();
            this._logicPos = new Vec2_1.Vec2(reader.float(), reader.float());
            const logicDir = new Vec2_1.Vec2(reader.float(), reader.float());
            this._logicRot = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(Vec2_1.Vec2.down)));
            if (logicDir.x < 0)
                this._logicRot = 360 - this._logicRot;
            this._fsm.ChangeState(reader.int32(), null);
            this._fsm.currentState.time = reader.int32();
            const count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), reader.float());
            }
        }
        PlayAnim(name, force = false) {
            if (!force && this._playingName == name)
                return;
            this._playingName = name;
            const aniHilder = this._animations.get(name);
            this._root.removeChildren();
            this._root.addChild(aniHilder);
            aniHilder.Play();
        }
    }
    exports.VEntity = VEntity;
});
//# sourceMappingURL=VEntity.js.map