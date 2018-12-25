import { FSM } from "../../RC/FSM/FSM";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { VEntityState } from "../FSM/VEntityState";
import { Skill } from "../Skill";
import { VEntity } from "./VEntity";
import { Vec2 } from "../../RC/Math/Vec2";
export class VChampion extends VEntity {
    constructor() {
        super(...arguments);
        this._fsm = new FSM();
        this.moveDirection = Vec2.zero;
    }
    LoadDefs() {
        this._defs = Defs.GetEntity(this._id);
        this._cdefs = CDefs.GetEntity(this._id);
    }
    OnInit() {
        super.OnInit();
        this._skills = [];
        const skillsDef = Hashtable.GetNumberArray(this._defs, "skills");
        for (const sid of skillsDef) {
            const skill = new Skill();
            skill.Init(sid);
            this._skills.push(skill);
        }
        const statesDef = Hashtable.GetMap(this._defs, "states");
        if (statesDef != null) {
            for (const type in statesDef) {
                this._fsm.AddState(new VEntityState(Number.parseInt(type), this));
            }
        }
    }
    DecodeSync(rid, reader, isNew) {
        super.DecodeSync(rid, reader, isNew);
        this.team = reader.int32();
        this.name = reader.string();
        this.hp = reader.int32();
        this.mhp = reader.int32();
        this.mp = reader.int32();
        this.mmp = reader.int32();
        this.atk = reader.int32();
        this.def = reader.int32();
        this.disableMove = reader.int32();
        this.disableTurn = reader.int32();
        this.disableSkill = reader.int32();
        this.supperArmor = reader.int32();
        this.invulnerAbility = reader.int32();
        this.moveDirection.Set(reader.double(), reader.double());
        if (reader.bool()) {
            this._fsm.ChangeState(reader.int32(), null);
            this._fsm.currentState.time = reader.double();
        }
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
