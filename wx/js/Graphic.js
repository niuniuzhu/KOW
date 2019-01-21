"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelLayer;
(function (ModelLayer) {
    ModelLayer[ModelLayer["EntityLow"] = 0] = "EntityLow";
    ModelLayer[ModelLayer["EntityHigh"] = 1] = "EntityHigh";
    ModelLayer[ModelLayer["EffectLow"] = 2] = "EffectLow";
    ModelLayer[ModelLayer["EffectHigh"] = 3] = "EffectHigh";
})(ModelLayer = exports.ModelLayer || (exports.ModelLayer = {}));
class Graphic {
    get battleRoot() { return this._battleRoot; }
    get mapRoot() { return this._mapRoot; }
    get lowEffectRoot() { return this._lowEffectRoot; }
    get entityLow() { return this._entityLow; }
    get entityHigh() { return this._entityHigh; }
    get highEffectRoot() { return this._highEffectRoot; }
    get hudRoot() { return this._hudRoot; }
    get uiRoot() { return this._uiRoot; }
    Init() {
        const pivot = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(pivot);
        pivot.setSize(0, 0);
        pivot.center();
        pivot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Center_Center);
        pivot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Middle_Middle);
        this._battleRoot = new fairygui.GComponent();
        this._battleRoot.name = "battle_root";
        this._battleRoot.setSize(0, 0);
        pivot.addChild(this._battleRoot);
        this._mapRoot = new fairygui.GComponent();
        this._mapRoot.name = "map_root";
        this._mapRoot.setSize(0, 0);
        this._battleRoot.addChild(this._mapRoot);
        this._lowEffectRoot = new fairygui.GComponent();
        this._lowEffectRoot.name = "effect_low";
        this._lowEffectRoot.setSize(0, 0);
        this._battleRoot.addChild(this._lowEffectRoot);
        this._entityLow = new fairygui.GComponent();
        this._entityLow.name = "entity_low";
        this._entityLow.setSize(0, 0);
        this._battleRoot.addChild(this._entityLow);
        this._entityHigh = new fairygui.GComponent();
        this._entityHigh.name = "entity_high";
        this._entityHigh.setSize(0, 0);
        this._battleRoot.addChild(this._entityHigh);
        this._highEffectRoot = new fairygui.GComponent();
        this._highEffectRoot.name = "effect_high";
        this._highEffectRoot.setSize(0, 0);
        this._battleRoot.addChild(this._highEffectRoot);
        this._hudRoot = new fairygui.GComponent();
        this._hudRoot.name = "hud_root";
        this._hudRoot.setSize(0, 0);
        this._battleRoot.addChild(this._hudRoot);
        this._uiRoot = new fairygui.GComponent();
        this._uiRoot.name = "ui_root";
        this._uiRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this._uiRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
        fairygui.GRoot.inst.addChild(this._uiRoot);
    }
}
exports.Graphic = Graphic;
