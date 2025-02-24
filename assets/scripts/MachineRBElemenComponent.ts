import { _decorator, CCBoolean, Component, Enum, ERigidBodyType, RigidBody, Vec3 } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('MachineRBElemenComponent')
@requireComponent(RigidBody)
export class MachineRBElemenComponent extends Component {
    @property(Vec3)
    readonly velocity: Vec3 = new Vec3()

    @property(CCBoolean)
    readonly isEnabled: boolean = false

    @property({ type: Enum(ERigidBodyType) })
    readonly type: ERigidBodyType = ERigidBodyType.DYNAMIC

    private rb: RigidBody = null

    start() {
        this.rb = this.node.getComponent(RigidBody)
        this.rb.enabled = this.isEnabled
    }

    public onGravitaion() {
        this.rb.enabled = true
        this.rb.useGravity = true
        this.rb.setLinearVelocity(this.velocity)
        this.rb.type = this.type
    }
}