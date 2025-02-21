import { _decorator, Collider, Component, Enum, ERigidBodyType, RigidBody } from 'cc';
import { GameEvent } from './event/GameEvent';
const { ccclass, property, requireComponent } = _decorator;

enum BlockType {
    USUALY = 1,
    TRAP = 2
}

@ccclass('RoadBlockComponent')
@requireComponent(Collider)
@requireComponent(RigidBody)
export class RoadBlockComponent extends Component {
    @property({ type: Enum(BlockType) })
    readonly block: BlockType = BlockType.USUALY

    private collider: Collider
    private rb: RigidBody

    protected start() {
        this.collider = this.node.getComponent(Collider)
        this.rb = this.node.getComponent(RigidBody)



        if (this.collider) {
            switch (this.block) {
                case BlockType.USUALY:
                    this.collider.on("onCollisionExit", this.collisionEnd, this)
                    break

                case BlockType.TRAP:
                    this.collider.on("onCollisionEnter", this.collisionStart, this)
                    break
            }

        }

    }

    private collisionEnd(event) {
        if (event.otherCollider.node.name == "wheel_back") {
            this.rb.type = ERigidBodyType.DYNAMIC
        }
    }

    private collisionStart(event) {
        if (event.otherCollider.node.name == "wheel_back") {
            this.rb.type = ERigidBodyType.DYNAMIC
            GameEvent.emit('CRASH')
        }
    }


}