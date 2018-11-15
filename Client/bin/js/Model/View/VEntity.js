define(["require", "exports", "../../RC/FSM/FSM", "../FSM/VEntityState"], function (require, exports, FSM_1, VEntityState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntity {
        constructor() {
            this._fsm = new FSM_1.FSM();
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Idle, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Move, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Attack, this));
            this._fsm.AddState(new VEntityState_1.VEntityState(VEntityState_1.VEntityState.Type.Die, this));
        }
        get id() { return this._id; }
        get actorID() { return this._actorID; }
        get team() { return this._team; }
        get name() { return this._name; }
        Init(id, battle) {
            this._id = id;
            this._battle = battle;
            this._fsm.ChangeState(VEntityState_1.VEntityState.Type.Idle);
        }
        Dispose() {
        }
        InitSnapshot(reader) {
        }
        DecodeSnapshot(reader) {
        }
    }
    exports.VEntity = VEntity;
});
//# sourceMappingURL=VEntity.js.map