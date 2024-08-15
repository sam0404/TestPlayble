import { _decorator, Collider, Component, ERigidBodyType, RigidBody } from 'cc';
import { GameEvent } from './event/GameEvent';
const { ccclass, property } = _decorator;

@ccclass('TrapBlockComponent')
export class TrapBlockComponent extends Component {
    private collider: Collider
    private rb: RigidBody

    protected start() {
        this.collider = this.node.getComponent(Collider)
        this.rb = this.node.getComponent(RigidBody)

        if (this.collider) {
            this.collider.on("onCollisionEnter", this.collisionStart, this)
        }

    }

    private collisionStart(event) {
        if (event.otherCollider.node.name == "wheel_front") {
            this.rb.type = ERigidBodyType.DYNAMIC

            GameEvent.emit('CRASH')
        }
    }
}


