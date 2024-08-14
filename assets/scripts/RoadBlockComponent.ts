import { _decorator, Collider, Component, ERigidBodyType, RigidBody } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('RoadBlockComponent')
@requireComponent(Collider)
@requireComponent(RigidBody)
export class RoadBlockComponent extends Component {
    private collider: Collider
    private rb: RigidBody

    protected start() {
        this.collider = this.node.getComponent(Collider)
        this.rb = this.node.getComponent(RigidBody)

        if (this.collider) {
            this.collider.on("onCollisionExit", this.collisionEnd, this)
        }

    }

    private collisionEnd(event) {
        if (event.otherCollider.node.name == "wheel_back") {
            this.rb.type = ERigidBodyType.DYNAMIC
        }
    }
}