import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FanComponent')
export class FanComponent extends Component {
    @property(Node)
    readonly particle: Node

    private startRotation = new Vec3();


    protected start() {
        this.startRotation = new Vec3();
        this.node.rotation.getEulerAngles(this.startRotation);
    }

    public rotate(speed: number) {
        this.particle.active = !(speed == 0)

        console.warn("FFF")

        this.startRotation.x += 9 * speed
        this.node.setRotationFromEuler(this.startRotation)
    }
}


