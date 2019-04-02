import { Global } from "../Global";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Protos } from "../Libs/protos";
export class UIRanking extends fairygui.Window {
    constructor() {
        super();
        fairygui.UIPackage.addPackage("res/ui/ranking");
    }
    onInit() {
        this.contentPane = fairygui.UIPackage.createObject("ranking", "Main").asCom;
        this.modal = true;
        this._list = this.contentPane.getChild("n13").asList;
    }
    onShown() {
        this.center();
        this.showModalWait();
        const request = ProtoCreator.Q_GC2CS_QueryRanking();
        request.sortType = Protos.GC2CS_QueryRanking.SortType.Rank;
        request.from = 0;
        request.count = 100;
        Global.connector.SendToCS(Protos.GC2CS_QueryRanking, request, resp => {
            this.closeModalWait();
            const data = resp;
            const count = data.rankingInfos.length;
            for (let i = 0; i < count; ++i) {
                const rankingInfo = data.rankingInfos[i];
                const item = this._list.addItemFromPool().asCom;
                item.getChild("n29").asTextField.text = "" + (i + 1);
                const loader = item.getChild("n19").asCom.getChild("loader").asLoader;
                loader.url = rankingInfo.avatar;
                item.getChild("n25").asTextField.text = rankingInfo.name;
                item.getChild("n24").asTextField.text = "" + rankingInfo.rank;
            }
        });
    }
    onHide() {
        this._list.removeChildrenToPool();
    }
}
