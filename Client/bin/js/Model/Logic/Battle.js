define(["require", "exports", "../../Global", "../../Libs/long", "../../Libs/protobufjs", "../../Libs/protos", "../../Net/ProtoHelper", "../../RC/Collections/Queue", "../../RC/FMath/FMathUtils", "../../RC/FMath/FRandom", "../../RC/FMath/FRect", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../../RC/Utils/Logger", "../BattleEvent/SyncEvent", "../Defs", "../FrameActionGroup", "./Bullet", "./Champion", "./Emitter", "./Entity", "./HitManager"], function (require, exports, Global_1, Long, $protobuf, protos_1, ProtoHelper_1, Queue_1, FMathUtils_1, FRandom_1, FRect_1, FVec2_1, Hashtable_1, Logger_1, SyncEvent_1, Defs_1, FrameActionGroup_1, Bullet_1, Champion_1, Emitter_1, Entity_1, HitManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Battle {
        constructor() {
            this._frameRate = 0;
            this._keyframeStep = 0;
            this._snapshotStep = 0;
            this._timeout = 0;
            this._mapID = 0;
            this._frame = 0;
            this.chase = false;
            this._bornPoses = [];
            this._bornDirs = [];
            this._destroied = false;
            this._markToEnd = false;
            this._frameActionGroups = new Queue_1.default();
            this._champions = [];
            this._idToChampion = new Map();
            this._emitters = [];
            this._idToEmitter = new Map();
            this._bullets = [];
            this._idToBullet = new Map();
            this._hitManager = new HitManager_1.HitManager(this);
        }
        get frameRate() { return this._frameRate; }
        get keyframeStep() { return this._keyframeStep; }
        get snapshotStep() { return this._snapshotStep; }
        get timeout() { return this._timeout; }
        get mapID() { return this._mapID; }
        get frame() { return this._frame; }
        get bounds() { return this._bounds; }
        get gladiatorTimeout() { return this._gladiatorTimeout; }
        get gladiatorPos() { return this._gladiatorPos; }
        get gladiatorRadius() { return this._gladiatorRadius; }
        get random() { return this._random; }
        get hitManager() { return this._hitManager; }
        SetBattleInfo(battleInfo) {
            this._destroied = false;
            this._frameRate = battleInfo.frameRate;
            this._keyframeStep = battleInfo.keyframeStep;
            this._snapshotStep = battleInfo.snapshotStep;
            this._random = new FRandom_1.FRandom(battleInfo.rndSeed);
            this._timeout = battleInfo.battleTime;
            this._mapID = battleInfo.mapID;
            this._msPerFrame = FMathUtils_1.FMathUtils.ToFixed(1000 / this._frameRate);
            this._frame = 0;
            this._nextKeyFrame = 0;
            this._logicElapsed = 0;
            this._realElapsed = 0;
            this._markToEnd = false;
            const defs = Defs_1.Defs.GetMap(this._mapID);
            let arr = Hashtable_1.Hashtable.GetArray(defs, "born_pos");
            let count = arr.length;
            for (let i = 0; i < count; i++) {
                const pi = arr[i];
                this._bornPoses.push(new FVec2_1.FVec2(FMathUtils_1.FMathUtils.ToFixed(pi[0]), FMathUtils_1.FMathUtils.ToFixed(pi[1])));
            }
            arr = Hashtable_1.Hashtable.GetArray(defs, "born_dir");
            count = arr.length;
            for (let i = 0; i < count; i++) {
                const pi = arr[i];
                this._bornDirs.push(new FVec2_1.FVec2(FMathUtils_1.FMathUtils.ToFixed(pi[0]), FMathUtils_1.FMathUtils.ToFixed(pi[1])));
            }
            const bWidth = Hashtable_1.Hashtable.GetNumber(defs, "width");
            const bHeight = Hashtable_1.Hashtable.GetNumber(defs, "height");
            this._bounds = new FRect_1.FRect(-FMathUtils_1.FMathUtils.Floor(bWidth * 0.5), -FMathUtils_1.FMathUtils.Floor(bHeight * 0.5), bWidth, bHeight);
            this._gladiatorTimeout = Hashtable_1.Hashtable.GetNumber(defs, "gladiator_timeout");
            this._gladiatorPos = Hashtable_1.Hashtable.GetFVec2(defs, "gladiator_pos");
            this._gladiatorRadius = Hashtable_1.Hashtable.GetNumber(defs, "gladiator_radius");
        }
        Destroy() {
            if (this._destroied)
                return;
            this._destroied = true;
            this._bounds = null;
            this._frameActionGroups.clear();
            this._hitManager.Destroy();
            for (let i = 0, count = this._champions.length; i < count; i++)
                this._champions[i].Destroy();
            this._champions.splice(0);
            this._idToChampion.clear();
            for (let i = 0, count = this._emitters.length; i < count; i++)
                this._emitters[i].Destroy();
            this._emitters.splice(0);
            this._idToEmitter.clear();
            for (let i = 0, count = this._bullets.length; i < count; i++)
                this._bullets[i].Destroy();
            this._bullets.splice(0);
            this._idToBullet.clear();
        }
        Update(dt) {
            this.Chase(this._frameActionGroups);
            this._realElapsed = FMathUtils_1.FMathUtils.Add(this._realElapsed, dt);
            if (this.frame < this._nextKeyFrame) {
                this._logicElapsed = FMathUtils_1.FMathUtils.Add(this._logicElapsed, dt);
                while (this._logicElapsed >= this._msPerFrame) {
                    if (this.frame >= this._nextKeyFrame)
                        break;
                    this.UpdateLogic(this._msPerFrame);
                    this._realElapsed = 0;
                    this._logicElapsed = FMathUtils_1.FMathUtils.Sub(this._logicElapsed, this._msPerFrame);
                }
            }
        }
        UpdateLogic(dt) {
            ++this._frame;
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                champion.Update(dt);
            }
            for (let i = 0, count = this._champions.length - 1; i < count; i++) {
                const champion = this._champions[i];
                champion.IntersectionTest(this._champions, i + 1);
            }
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                champion.UpdatePhysic(dt);
            }
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                champion.AfterUpdate(dt);
            }
            for (let i = 0, count = this._emitters.length; i < count; i++) {
                const emitter = this._emitters[i];
                emitter.Update(dt);
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                bullet.Update(dt);
            }
            if (!this.chase) {
                this.SyncToView();
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                bullet.Intersect();
            }
            this._hitManager.Update();
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                champion.UpdateAfterHit();
            }
            for (let i = 0, count = this._champions.length; i < count; i++) {
                const champion = this._champions[i];
                if (champion.markToDestroy) {
                    this.DestroyChampionAt(i);
                    --i;
                    --count;
                }
            }
            for (let i = 0, count = this._bullets.length; i < count; i++) {
                const bullet = this._bullets[i];
                if (bullet.markToDestroy) {
                    this.DestroyBulletAt(i);
                    --i;
                    --count;
                }
            }
            for (let i = 0, count = this._emitters.length; i < count; i++) {
                const emitter = this._emitters[i];
                if (emitter.markToDestroy) {
                    this.DestroyEmitterAt(i);
                    --i;
                    --count;
                }
            }
            this.CheckBattleEnd();
            if (!this.chase && (this._frame % this._snapshotStep) == 0) {
                const writer = $protobuf.Writer.create();
                this.EncodeSnapshot(writer);
                const data = writer.finish();
                const request = ProtoHelper_1.ProtoCreator.Q_GC2BS_CommitSnapshot();
                request.frame = this._frame;
                request.data = data;
                Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_CommitSnapshot, request);
            }
        }
        EncodeSnapshot(writer) {
            writer.int32(this._frame);
            writer.bool(this._markToEnd);
            let count = this._champions.length;
            writer.int32(count);
            for (let i = 0; i < count; i++) {
                const champion = this._champions[i];
                champion.EncodeSnapshot(writer);
            }
            count = this._emitters.length;
            writer.int32(count);
            for (let i = 0; i < count; i++) {
                const emitter = this._emitters[i];
                emitter.EncodeSnapshot(writer);
            }
            count = this._bullets.length;
            writer.int32(count);
            for (let i = 0; i < count; i++) {
                const bullet = this._bullets[i];
                bullet.EncodeSnapshot(writer);
            }
            this._hitManager.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            this._frame = reader.int32();
            this._markToEnd = reader.bool();
            let count = reader.int32();
            for (let i = 0; i < count; i++) {
                const champion = new Champion_1.Champion(this);
                champion.DecodeSnapshot(reader);
                this._champions.push(champion);
                this._idToChampion.set(champion.rid.toString(), champion);
            }
            count = reader.int32();
            for (let i = 0; i < count; i++) {
                const emitter = new Emitter_1.Emitter(this);
                emitter.DecodeSnapshot(reader);
                this._emitters.push(emitter);
                this._idToEmitter.set(emitter.rid.toString(), emitter);
            }
            count = reader.int32();
            for (let i = 0; i < count; i++) {
                const bullet = new Bullet_1.Bullet(this);
                bullet.DecodeSnapshot(reader);
                this._bullets.push(bullet);
                this._idToBullet.set(bullet.rid.toString(), bullet);
            }
            this._hitManager.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            writer.int32(this._frame);
            let count = this._champions.length;
            writer.int32(count);
            for (let i = 0; i < count; i++) {
                const champion = this._champions[i];
                champion.EncodeSync(writer);
            }
            count = this._bullets.length;
            writer.int32(count);
            for (let i = 0; i < count; i++) {
                const bullet = this._bullets[i];
                bullet.EncodeSync(writer);
            }
        }
        SyncInitToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSync(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.BattleInit(data);
        }
        SyncToView() {
            const writer = $protobuf.Writer.create();
            this.EncodeSync(writer);
            const data = writer.finish();
            SyncEvent_1.SyncEvent.Snapshot(data);
        }
        Chase(frameActionGroups) {
            if (frameActionGroups == null)
                return;
            while (!frameActionGroups.isEmpty()) {
                const frameActionGroup = frameActionGroups.dequeue();
                let length = frameActionGroup.frame - this.frame;
                while (length > 0) {
                    this.UpdateLogic(this._msPerFrame);
                    --length;
                }
                this.ApplyFrameActionGroup(frameActionGroup);
                this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
            }
        }
        MakeRid(id) {
            const rnd = this._random.NextFloor(0, 0xfffff);
            return Long.fromBits(id, rnd);
        }
        CreatePlayers(playerInfos) {
            const params = new Entity_1.EntityInitParams();
            const count = playerInfos.length;
            for (let i = 0; i < count; ++i) {
                const playerInfo = playerInfos[i];
                params.rid = playerInfo.gcNID;
                params.id = playerInfo.actorID;
                params.team = playerInfo.team;
                params.name = playerInfo.name;
                const player = this.CreateChampion(params);
                if (player.team >= this._bornPoses.length ||
                    player.team >= this._bornDirs.length) {
                    throw new Error("invalid team:" + player.team + ", player:" + player.rid);
                }
                player.position.CopyFrom(this._bornPoses[player.team]);
                player.direction.CopyFrom(this._bornDirs[player.team]);
            }
        }
        CreateChampion(params) {
            const champion = new Champion_1.Champion(this);
            champion.Init(params);
            this._champions.push(champion);
            this._idToChampion.set(champion.rid.toString(), champion);
            return champion;
        }
        DestroyChampion(champion) {
            champion.Destroy();
            this._champions.splice(this._champions.indexOf(champion), 1);
            this._idToChampion.delete(champion.rid.toString());
        }
        DestroyChampionAt(index) {
            const champion = this._champions[index];
            champion.Destroy();
            this._champions.splice(index, 1);
            this._idToChampion.delete(champion.rid.toString());
        }
        GetChampion(rid) {
            return this._idToChampion.get(rid.toString());
        }
        GetChampions() {
            return this._champions;
        }
        CreateEmitter(id, casterID, skillID) {
            const emitter = new Emitter_1.Emitter(this);
            emitter.Init(this.MakeRid(id), id, casterID, skillID);
            this._emitters.push(emitter);
            this._idToEmitter.set(emitter.rid.toString(), emitter);
            return emitter;
        }
        DestroyEmitter(emitter) {
            emitter.Destroy();
            this._emitters.splice(this._emitters.indexOf(emitter), 1);
            this._idToEmitter.delete(emitter.rid.toString());
        }
        DestroyEmitterAt(index) {
            const emitter = this._emitters[index];
            emitter.Destroy();
            this._emitters.splice(index, 1);
            this._idToEmitter.delete(emitter.rid.toString());
        }
        GetEmitter(rid) {
            return this._idToEmitter.get(rid.toString());
        }
        CreateBullet(id, casterID, skillID, position, direction) {
            const params = new Entity_1.EntityInitParams();
            params.rid = this.MakeRid(id);
            params.id = id;
            params.casterID = casterID;
            params.skillID = skillID;
            params.position = position;
            params.direction = direction;
            const bullet = new Bullet_1.Bullet(this);
            bullet.Init(params);
            this._bullets.push(bullet);
            this._idToBullet.set(bullet.rid.toString(), bullet);
            return bullet;
        }
        DestroyBullet(bullet) {
            bullet.Destroy();
            this._bullets.splice(this._bullets.indexOf(bullet), 1);
            this._idToBullet.delete(bullet.rid.toString());
        }
        DestroyBulletAt(index) {
            const bullet = this._bullets[index];
            bullet.Destroy();
            this._bullets.splice(index, 1);
            this._idToBullet.delete(bullet.rid.toString());
        }
        GetBullet(rid) {
            return this._idToBullet.get(rid.toString());
        }
        ApplyFrameActionGroup(frameActionGroup) {
            for (let i = 0; i < frameActionGroup.numActions; i++) {
                this.ApplyFrameAction(frameActionGroup.Get(i));
            }
        }
        ApplyFrameAction(frameAction) {
            const champion = this.GetChampion(frameAction.gcNID);
            champion.FrameAction(frameAction);
        }
        CheckBattleEnd() {
            if (this._markToEnd)
                return;
            let team0Win = false;
            let team1Win = false;
            for (const champion of this._champions) {
                if (champion.gladiatorTime >= this._gladiatorTimeout) {
                    if (champion.team == 0)
                        team0Win = true;
                    else
                        team1Win = true;
                }
            }
            if (!team0Win && !team1Win && this._champions.length > 1) {
                team0Win = true;
                team1Win = true;
                for (const champion of this._champions) {
                    if (champion.team == 0 && !champion.isDead) {
                        team1Win = false;
                    }
                    if (champion.team == 1 && !champion.isDead) {
                        team0Win = false;
                    }
                }
            }
            let winTeam = 0;
            if (team0Win && !team1Win) {
                winTeam = 1 << 0;
            }
            else if (!team0Win && team1Win) {
                winTeam = 1 << 1;
            }
            else if (team0Win && team1Win) {
                winTeam = (1 << 0) | (1 << 1);
            }
            if (winTeam != 0) {
                const writer = $protobuf.Writer.create();
                this.EncodeSnapshot(writer);
                const data = writer.finish();
                const msg = ProtoHelper_1.ProtoCreator.Q_GC2BS_EndBattle();
                msg.winTeam = winTeam;
                msg.snapshot = data;
                Global_1.Global.connector.bsConnector.Send(protos_1.Protos.GC2BS_EndBattle, msg);
                this._markToEnd = true;
            }
        }
        HandleSnapShot(ret) {
            const reader = $protobuf.Reader.create(ret.snapshot);
            this.DecodeSnapshot(reader);
        }
        HandleFrameAction(frame, data) {
            const frameActionGroup = new FrameActionGroup_1.FrameActionGroup(frame);
            frameActionGroup.Deserialize(data);
            this._frameActionGroups.enqueue(frameActionGroup);
        }
        HandleOutOfSync(msg) {
            let str = "===============data1===============";
            let reader = $protobuf.Reader.create(msg.data1);
            str += this.Dump(reader);
            str += "===============data2===============";
            reader = $protobuf.Reader.create(msg.data2);
            str += this.Dump(reader);
            Logger_1.Logger.Log(str);
        }
        Dump(reader) {
            let str = "";
            reader.int32();
            let count = reader.int32();
            for (let i = 0; i < count; i++) {
                const champion = new Champion_1.Champion(this);
                champion.DecodeSnapshot(reader);
                str += "======champion======\n";
                str += champion.Dump();
            }
            count = reader.int32();
            for (let i = 0; i < count; i++) {
                const emitter = new Emitter_1.Emitter(this);
                emitter.DecodeSnapshot(reader);
                str += "======emitter======\n";
                str += emitter.Dump();
            }
            count = reader.int32();
            for (let i = 0; i < count; i++) {
                const bullet = new Bullet_1.Bullet(this);
                bullet.DecodeSnapshot(reader);
                str += "======bullet======\n";
                str += bullet.Dump();
            }
            return str;
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map