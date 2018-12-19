define(["require", "exports", "../../Global", "../../RC/FSM/FSM", "../../RC/Math/MathUtils", "../../RC/Math/Vec2", "../CDefs", "../Defs", "../FSM/StateEnums", "../FSM/VEntityState", "../Skill", "./AnimationProxy", "./VAttribute"], function (require, exports, Global_1, FSM_1, MathUtils_1, Vec2_1, CDefs_1, Defs_1, StateEnums_1, VEntityState_1, Skill_1, AnimationProxy_1, VAttribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntity {
        constructor() {
            this.attribute = new VAttribute_1.VAttribute();
            this._skills = [];
            this._position = Vec2_1.Vec2.zero;
            this._worldPosition = Vec2_1.Vec2.zero;
            this._rotation = 0;
            this._logicPos = Vec2_1.Vec2.zero;
            this._logicRot = 0;
            this._fsm = new FSM_1.FSM();
            this._root = new fairygui.GComponent();
            this._animationProxy = new AnimationProxy_1.AnimationProxy();
            this._root.setSize(0, 0);
            this._root.setPivot(0.5, 0.5, true);
            Global_1.Global.graphic.entityRoot.addChild(this._root);
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Idle, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Move, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Attack, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(StateEnums_1.StateType.Die, this));
        }
        get id() { return this._id; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        get def() { return this._def; }
        get cdef() { return this._cdef; }
        get root() { return this._root; }
        get animationProxy() { return this._animationProxy; }
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
            this._root.dispose();
        }
        Update(dt) {
            this.position = Vec2_1.Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
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
        InitSync(reader) {
            this._actorID = reader.int32();
            this._def = Defs_1.Defs.GetEntity(this._actorID);
            this._cdef = CDefs_1.CDefs.GetEntity(this._actorID);
            this._animationProxy.Init(this._actorID, this._cdef);
            this._root.addChild(this._animationProxy);
            this._team = reader.int32();
            this._name = reader.string();
            this.position = new Vec2_1.Vec2(reader.float(), reader.float());
            this._logicPos.CopyFrom(this.position);
            const logicDir = new Vec2_1.Vec2(reader.float(), reader.float());
            this.rotation = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(Vec2_1.Vec2.down)));
            if (logicDir.x < 0)
                this.rotation = 360 - this.rotation;
            this._logicRot = this.rotation;
            const speed = new Vec2_1.Vec2(reader.float(), reader.float());
            let count = reader.int32();
            for (let i = 0; i < count; ++i) {
                this.attribute.Set(reader.int32(), reader.float());
            }
            count = reader.int32();
            for (let i = 0; i < count; ++i) {
                const skill = new Skill_1.Skill();
                skill.Init(reader.int32());
                this._skills.push(skill);
            }
            this._fsm.ChangeState(reader.int32(), null);
            this._fsm.currentState.time = reader.float();
        }
        DecodeSync(reader) {
            this._actorID = reader.int32();
            this._team = reader.int32();
            this._name = reader.string();
            this._logicPos = new Vec2_1.Vec2(reader.float(), reader.float());
            const logicDir = new Vec2_1.Vec2(reader.float(), reader.float());
            this._logicRot = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(Vec2_1.Vec2.down)));
            if (logicDir.x < 0)
                this._logicRot = 360 - this._logicRot;
            const speed = new Vec2_1.Vec2(reader.float(), reader.float());
            let count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), reader.float());
            }
            count = reader.int32();
            for (let i = 0; i < count; ++i) {
                reader.int32();
            }
            this._fsm.ChangeState(reader.int32(), null);
            this._fsm.currentState.time = reader.float();
        }
        PlayAnim(name, timeScale = 1, force = false) {
            this._animationProxy.Play(name, 0, timeScale, force);
        }
        HasSkill(id) {
            for (const skill of this._skills) {
                if (skill.id == id)
                    return true;
            }
            return false;
        }
        GetSkill(id) {
            for (const skill of this._skills) {
                if (skill.id == id)
                    return skill;
            }
            return null;
        }
        GetSkillAt(index) {
            return this._skills[index];
        }
    }
    exports.VEntity = VEntity;
});
//# sourceMappingURL=VEntity.js.map