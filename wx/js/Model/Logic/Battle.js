export class Battle {
    Init(loginRet) {
        this.frameRate = loginRet.frameRate;
        this.keyframeStep = loginRet.keyframeStep;
        this.timeout = loginRet.battleTime;
        this.mapID = loginRet.mapID;
    }
}
