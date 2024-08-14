import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('t')
export class t extends Component {
    private startRotation = new Vec3();

    start() {
        this.startRotation = new Vec3();
        this.node.rotation.getEulerAngles(this.startRotation);
    }

    update(deltaTime: number) {
        const { y, w } = this.node.getRotation()
        this.startRotation.y += 5
        this.node.setRotationFromEuler(this.startRotation)
    }
}


