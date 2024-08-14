import { _decorator, Component, Node, Vec3 } from 'cc';
import { GameEvent } from './event/GameEvent';
const { ccclass, property } = _decorator;

@ccclass('CameraComponent')
export class CameraComponent extends Component {
    @property(Node)
    readonly target: Node

    private previousTargetPosition: Vec3

    private isCrash: boolean = false

    protected start() {
        this.previousTargetPosition = this.target.position.clone()

        GameEvent.on("CRASH", this.onCrash, this)
    }

    update(deltaTime: number) {
        if (this.isCrash) return

        const { x, y, z } = this.node.worldPosition
        let deltaX = this.target.position.x - this.previousTargetPosition.x

        let newPosition = new Vec3(x + deltaX, y, z)
        this.node.worldPosition = newPosition

        this.previousTargetPosition = this.target.position.clone()
    }

    private onCrash() {
        this.isCrash = true
    }
}


