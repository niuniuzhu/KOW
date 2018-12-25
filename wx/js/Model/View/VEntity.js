import { Global } from "../../Global";
import Decimal from "../../Libs/decimal";
import { FVec2 } from "../../RC/FMath/FVec2";
import { FSM } from "../../RC/FSM/FSM";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Attribute } from "../Attribute";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { StateType } from "../FSM/StateEnums";
import { VEntityState } from "../FSM/VEntityState";
import { Skill } from "../Skill";
import { AnimationProxy } from "./AnimationProxy";
export class VEntity {
    constructor() {
        this.attribute = new Attribute();
        this._skills = [];
        this._position = FVec2.zero;
        this._worldPosition = FVec2.zero;
        this._rotation = 0;
        this._logicPos = FVec2.zero;
        this._logicRot = 0;
        this._fsm = new FSM();
        this._root = new fairygui.GComponent();
        this._animationProxy = new AnimationProxy();
        this._root.setSize(0, 0);
        this._root.setPivot(0.5, 0.5, true);
        Global.graphic.entityRoot.addChild(this._root);
        this._fsm.AddState(new VEntityState(StateType.Idle, this));
        this._fsm.AddState(new VEntityState(StateType.Move, this));
        this._fsm.AddState(new VEntityState(StateType.Attack, this));
        this._fsm.AddState(new VEntityState(StateType.Die, this));
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
        const delta = FVec2.Sub(value, this._position);
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
        this.position = FVec2.Lerp(this._position, this._logicPos, VEntity.D_SMALL0.mul(dt));
        this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
    }
    OnPositionChanged(delta) {
        this._root.setXY(this._position.x.toNumber(), this._position.y.toNumber());
        let point = new Laya.Point();
        this._root.localToGlobal(0, 0, point);
        this._worldPosition.x = new Decimal(point.x);
        this._worldPosition.y = new Decimal(point.y);
    }
    OnRatationChanged(delta) {
        this._root.rotation = this._rotation;
    }
    InitSnapshot(reader) {
        this._actorID = reader.int32();
        this._def = Defs.GetEntity(this._actorID);
        this._cdef = CDefs.GetEntity(this._actorID);
        this._animationProxy.Init(this._actorID, this._cdef);
        this._root.addChild(this._animationProxy);
        this._team = reader.int32();
        this._name = reader.string();
        this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._logicPos.CopyFrom(this.position);
        const logicDir = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this.rotation = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(FVec2.down).toNumber()));
        if (logicDir.x.lessThan(MathUtils.D_ZERO))
            this.rotation = 360 - this.rotation;
        this._logicRot = this.rotation;
        const moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        let count = reader.int32();
        for (let i = 0; i < count; ++i) {
            this.attribute.Set(reader.int32(), new Decimal(reader.float()));
        }
        count = reader.int32();
        for (let i = 0; i < count; ++i) {
            const skill = new Skill();
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
        this._logicPos = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        const logicDir = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(FVec2.down).toNumber()));
        if (logicDir.x.lessThan(MathUtils.D_ZERO))
            this._logicRot = 360 - this._logicRot;
        const moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        let count = reader.int32();
        for (let i = 0; i < count; i++) {
            this.attribute.Set(reader.int32(), new Decimal(reader.float()));
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
VEntity.D_SMALL0 = new Decimal(0.012);
