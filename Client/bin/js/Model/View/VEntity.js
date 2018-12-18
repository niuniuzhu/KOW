define(["require", "exports", "../../Global", "../../Libs/decimal", "../../RC/FMath/FVec2", "../../RC/FSM/FSM", "../../RC/Math/MathUtils", "../Attribute", "../Defs", "../FSM/StateEnums", "../FSM/VEntityState", "../Skill", "./AniHolder"], function (require, exports, Global_1, decimal_1, FVec2_1, FSM_1, MathUtils_1, Attribute_1, Defs_1, StateEnums_1, VEntityState_1, Skill_1, AniHolder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntity {
        constructor() {
            this.attribute = new Attribute_1.Attribute();
            this._skills = [];
            this._position = FVec2_1.FVec2.zero;
            this._worldPosition = FVec2_1.FVec2.zero;
            this._rotation = 0;
            this._logicPos = FVec2_1.FVec2.zero;
            this._logicRot = 0;
            this._fsm = new FSM_1.FSM();
            this._root = new fairygui.GComponent();
            this._aniHolder = new AniHolder_1.AniHolder();
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
        get root() { return this._root; }
        get position() { return this._position; }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            const delta = FVec2_1.FVec2.Sub(value, this._position);
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
            this.position = FVec2_1.FVec2.Lerp(this._position, this._logicPos, VEntity.D_SMALL0.mul(dt));
            this.rotation = MathUtils_1.MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
        }
        OnPositionChanged(delta) {
            this._root.setXY(this._position.x.toNumber(), this._position.y.toNumber());
            let point = new Laya.Point();
            this._root.localToGlobal(0, 0, point);
            this._worldPosition.x = new decimal_1.default(point.x);
            this._worldPosition.y = new decimal_1.default(point.y);
        }
        OnRatationChanged(delta) {
            this._root.rotation = this._rotation;
        }
        InitSnapshot(reader) {
            this._actorID = reader.int32();
            this._def = Defs_1.Defs.GetEntity(this._actorID);
            this._aniHolder.Init(this._actorID);
            this._root.addChild(this._aniHolder);
            this._team = reader.int32();
            this._name = reader.string();
            this.position = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this._logicPos.CopyFrom(this.position);
            const logicDir = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this.rotation = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(FVec2_1.FVec2.down).toNumber()));
            if (logicDir.x.lessThan(MathUtils_1.MathUtils.D_ZERO))
                this.rotation = 360 - this.rotation;
            this._logicRot = this.rotation;
            const moveDirection = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            let count = reader.int32();
            for (let i = 0; i < count; ++i) {
                this.attribute.Set(reader.int32(), new decimal_1.default(reader.float()));
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
        DecodeSnapshot(reader) {
            this._actorID = reader.int32();
            this._team = reader.int32();
            this._name = reader.string();
            this._logicPos = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            const logicDir = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            this._logicRot = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(FVec2_1.FVec2.down).toNumber()));
            if (logicDir.x.lessThan(MathUtils_1.MathUtils.D_ZERO))
                this._logicRot = 360 - this._logicRot;
            const moveDirection = new FVec2_1.FVec2(new decimal_1.default(reader.float()), new decimal_1.default(reader.float()));
            let count = reader.int32();
            for (let i = 0; i < count; i++) {
                this.attribute.Set(reader.int32(), new decimal_1.default(reader.float()));
            }
            count = reader.int32();
            for (let i = 0; i < count; ++i) {
                reader.int32();
            }
            this._fsm.ChangeState(reader.int32(), null);
            this._fsm.currentState.time = reader.float();
        }
        PlayAnim(name, force = false) {
            this._aniHolder.Play(name, 0, force);
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
    VEntity.D_SMALL0 = new decimal_1.default(0.012);
    exports.VEntity = VEntity;
});
//# sourceMappingURL=VEntity.js.map