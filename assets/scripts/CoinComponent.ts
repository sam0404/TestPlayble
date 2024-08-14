import { _decorator, CCFloat, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinComponent')
export class CoinComponent extends Component {
    @property(CCFloat)
    readonly speed: number = 8

    private startRotation = new Vec3();

    protected start() {
        this.startRotation = new Vec3();
        this.node.rotation.getEulerAngles(this.startRotation);
    }

    protected update(dt: number): void {
        this.startRotation.y += this.speed
        this.node.setRotationFromEuler(this.startRotation)
    }
}


