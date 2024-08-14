import { _decorator, CCFloat, Component, RigidBody, Vec3 } from 'cc';
import { GameEvent } from './event/GameEvent';
import { FanComponent } from './FanComponent';
import { HandleComponent } from './HandleComponent';
import { WheelComponent } from './WheelComponent';
const { ccclass, property } = _decorator;

@ccclass('MachineComponent')
export class MachineComponent extends Component {
    @property(HandleComponent)
    readonly handleCpmponent: HandleComponent


    @property(CCFloat)
    private speed: number = 5

    private wheels: WheelComponent[] = []
    private partsRB: RigidBody[] = []
    private fan: FanComponent;


    protected start(): void {
        this.partsRB = this.node.getComponentsInChildren(RigidBody)
        this.partsRB.push(this.node.getComponent(RigidBody))
        this.fan = this.node.getComponentInChildren(FanComponent)

        this.onDisableRB()

        this.wheels = this.node.getComponentsInChildren(WheelComponent)

        GameEvent.on("CRASH", this.onCrash, this)
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
        const mulltiplicator = 4
        this.partsRB.forEach(part => {
            part.enabled = true
            part.useGravity = true
            part.linearFactor = new Vec3(Math.random() * mulltiplicator,
                Math.random() * mulltiplicator, Math.random() * mulltiplicator)
        })
    }

    private onDisableRB() {
        this.partsRB.forEach(part => {
            if (part.name.includes("wheel")) return

            part.enabled = false
        })
    }
}


