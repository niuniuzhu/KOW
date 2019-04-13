define(["require", "exports", "../Global", "../Libs/protos", "../Net/ProtoHelper"], function (require, exports, Global_1, protos_1, ProtoHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIInviting extends fairygui.Window {
        onInit() {
            this.contentPane = fairygui.UIPackage.createObject("main", "invating").asCom;
            this.modal = true;
            this._cancelBtn = this.contentPane.getChild("cancel_btn").asCom;
            this._cancelBtn.onClick(this, this.OnCancelBtnClick);
        }
        OnCancelBtnClick() {
            const request = ProtoHelper_1.ProtoCreator.Q_GC2CS_LeaveRoom();
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_LeaveRoom, request);
            this.hide();
        }
    }
    exports.UIInviting = UIInviting;
});
//# sourceMappingURL=UIInviting.js.map