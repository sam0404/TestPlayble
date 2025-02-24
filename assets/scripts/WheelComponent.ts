import { _decorator, Component, RigidBody, Vec3 } from 'cc';
const { ccclass, requireComponent } = _decorator;

@ccclass('WheelComponent')
@requireComponent(RigidBody)
export class WheelComponent extends Component {
    private startRotation = new Vec3();
    private rb: RigidBody

    protected start() {
        this.rb = this.node.getComponent(RigidBody)
        this.startRotation = new Vec3();
        this.node.rotation.getEulerAngles(this.startRotation);
    }

    public rotateWheel(speed: number) {
        this.startRotation.y += 5 * speed
        this.node.setRotationFromEuler(this.startRotation)
    }

    public onGravitation() {
        this.rb.setLinearVelocity(new Vec3(8, 1, 1))
        this.rb.useGravity = true
    }
}