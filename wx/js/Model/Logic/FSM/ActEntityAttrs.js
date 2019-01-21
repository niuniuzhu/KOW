"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
const EntityStateAction_1 = require("./EntityStateAction");
class ActEntityAttrs extends EntityStateAction_1.EntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._attrs = Hashtable_1.Hashtable.GetNumberArray(def, "attrs");
        this._values = Hashtable_1.Hashtable.GetNumberArray(def, "values");
    }
    OnTrigger() {
        super.OnTrigger();
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            this.ActiveAttr(this._attrs[i], this._values[i]);
        }
    }
    OnExit() {
        this.DeactiveAttrs();
        super.OnExit();
    }
    ActiveAttr(attr, value) {
        const owner = this.state.owner;
        owner.SetAttr(attr, owner.GetAttr(attr) + value);
    }
    DeactiveAttrs() {
        const owner = this.state.owner;
        const count = this._attrs.length;
        for (let i = 0; i < count; ++i) {
            owner.SetAttr(this._attrs[i], owner.GetAttr(this._attrs[i]) - this._values[i]);
        }
    }
}
exports.ActEntityAttrs = ActEntityAttrs;
