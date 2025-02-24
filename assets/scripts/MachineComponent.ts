import { _decorator, CCFloat, Collider, Component } from 'cc';
import { GameEvent } from './event/GameEvent';
import { FanComponent } from './FanComponent';
import { MachineRBElemenComponent } from './MachineRBElemenComponent';
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
    private partsRB: MachineRBElemenComponent[] = []
    private fan: FanComponent;

    private isCrash: boolean = false

    protected start(): void {
        this.partsRB = this.node.getComponentsInChildren(MachineRBElemenComponent)
        this.fan = this.node.getComponentInChildren(FanComponent)

        this.wheels = this.node.getComponentsInChildren(WheelComponent)

        GameEvent.on("CRASH", this.onCrash, this)

        this.bodyCollider.on("onTriggerEnter", this.onCoinCollect, this)
    }

    protected update(deltaTime: number) {
        if (this.isCrash) return

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

        this.scheduleOnce(() => {
            this.partsRB.forEach(part => {
                part.onGravitaion()
                let collider = part.node.getComponent(Collider)
                if (collider) {
                    collider.isTrigger = false
                }
            }, 1)

            this.wheels.forEach(wheel => wheel.onGravitation())
        })



        this.handleCpmponent.node.active = false
    }

    private onCoinCollect(event) {
        if (event.otherCollider.node.name.includes("Coin")) {
            event.otherCollider.node.active = false

            GameEvent.emit("COIN_COLLECT")
        }
    }
}