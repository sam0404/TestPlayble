import { _decorator, CCFloat, Collider, Component, ERigidBodyType, RigidBody } from 'cc';
import { GameEvent } from './event/GameEvent';
import { FanComponent } from './FanComponent';
import { HandleComponent } from './UI/HandleComponent';
import { WheelComponent } from './WheelComponent';

const { ccclass, property } = _decorator;

@ccclass('MachineComponent')
export class MachineComponent extends Component {
    @property(HandleComponent)
    readonly handleCpmponent: HandleComponent

    @property(CCFloat)
    private speed: number = 25

    @property(Collider)
    readonly bodyCollider: Collider

    private wheels: WheelComponent[] = []
    private partsRB: RigidBody[] = []
    private fan: FanComponent;

    private isCrash: boolean = false


    protected start(): void {
        this.partsRB = this.node.getComponentsInChildren(RigidBody)
        this.partsRB.push(this.node.getComponent(RigidBody))
        this.fan = this.node.getComponentInChildren(FanComponent)

        this.onDisableRB()

        this.wheels = this.node.getComponentsInChildren(WheelComponent)

        GameEvent.on("CRASH", this.onCrash, this)

        this.bodyCollider.on("onTriggerEnter", this.onCoinCollect, this)
    }

    protected update(deltaTime: number) {
        let newPos = this.node.position.clone()
        newPos.x += this.speed * this.handleCpmponent.handleSpeed * deltaTime

        this.node.position = newPos

        this.wheels.forEach(wheel => {
            wheel.rotateWheel(this.handleCpmponent.handleSpeed)
        })

        this.fan.rotate(this.handleCpmponent.handleSpeed)
    }

    private onCrash() {
        this.isCrash = true
        this.speed = 2

        this.partsRB.forEach(part => {
            part.type = ERigidBodyType.DYNAMIC
            part.enabled = true
            part.useGravity = true
            let collider = part.node.getComponent(Collider)
            if (collider) {
                collider.isTrigger = false
            }

        })

        this.wheels.forEach(wheel => wheel.onGravitation())

        this.handleCpmponent.node.active = false
    }

    private onDisableRB() {
        this.partsRB.forEach(part => {
            if (part.name.includes("wheel")) return
            part.useGravity = false
            part.enabled = true
        })
    }

    private onCoinCollect(event) {
        if (event.otherCollider.node.name.includes("Coin")) {
            event.otherCollider.node.active = false

            GameEvent.emit("COIN_COLLECT")
        }
    }
}