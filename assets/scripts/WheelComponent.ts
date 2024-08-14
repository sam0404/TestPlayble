import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WheelComponent')
export class WheelComponent extends Component {
    private startRotation = new Vec3();

    protected start() {
        this.startRotation = new Vec3();
        this.node.rotation.getEulerAngles(this.startRotation);
    }

    public rotateWheel(speed: number) {
        this.startRotation.y += 5 * speed
        this.node.setRotationFromEuler(this.startRotation)
    }
}


