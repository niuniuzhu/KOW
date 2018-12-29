define(["require", "exports", "../../Global", "../../RC/Math/MathUtils", "../../RC/Math/Vec2", "./AnimationProxy", "../../Consts"], function (require, exports, Global_1, MathUtils_1, Vec2_1, AnimationProxy_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntity {
        constructor(battle) {
            this._position = Vec2_1.Vec2.zero;
            this._worldPosition = Vec2_1.Vec2.zero;
            this._rotation = 0;
            this._logicPos = Vec2_1.Vec2.zero;
            this._logicRot = 0;
            this._root = new fairygui.GComponent();
            this._animationProxy = new AnimationProxy_1.AnimationProxy();
            this._battle = battle;
            this._root.setSize(0, 0);
            this._root.setPivot(0.5, 0.5, true);
            Global_1.Global.graphic.entityRoot.addChild(this._root);
        }
        get rid() { return this._rid; }
        get id() { return this._id; }
        get defs() { return this._defs; }
        get cdefs() { return this._cdefs; }
        get root() { return this._root; }
        get animationProxy() { return this._animationProxy; }
        get markToDestroy() { return this._markToDestroy; }
        get position() { return this._position; }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            const delta = Vec2_1.Vec2.Sub(value, this._position);
            this._position.CopyFrom(value);
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
        Destroy() {
            this._root.dispose();
        }
        Update(dt) {
            this.position = Vec2_1.Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
            this.rotation = MathUtils_1.MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.008);
        }
        OnPositionChanged(delta) {
            this._root.setXY(this._position.x, this._position.y);
            let point = new Laya.Point();
            this._root.localToGlobal(0, 0, point);
            this._worldPosition.Set(point.x, point.y);
        }
        OnRatationChanged(delta) {
            this._root.rotation = this._rotation;
        }
        OnInit() {
            this._animationProxy.Init(this._cdefs);
            this._root.addChild(this._animationProxy);
        }
        DecodeSync(rid, reader, isNew) {
            this._rid = rid;
            this._id = reader.int32();
            if (isNew) {
                this.LoadDefs();
                this.OnInit();
            }
            this._markToDestroy = reader.bool();
            this._logicPos = new Vec2_1.Vec2(reader.double() * Consts_1.Consts.LOGIC_TO_PIXEL_RATIO, reader.double() * Consts_1.Consts.LOGIC_TO_PIXEL_RATIO);
            const logicDir = new Vec2_1.Vec2(reader.double(), reader.double());
            this._logicRot = MathUtils_1.MathUtils.RadToDeg(MathUtils_1.MathUtils.Acos(logicDir.Dot(Vec2_1.Vec2.down)));
            if (logicDir.x < 0) {
                this._logicRot = 360 - this._logicRot;
            }
            if (isNew) {
                this.position = this._logicPos.Clone();
                this.rotation = this._logicRot;
            }
        }
    }
    exports.VEntity = VEntity;
});
//# sourceMappingURL=VEntity.js.map