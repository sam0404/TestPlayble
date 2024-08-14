import { _decorator, CCFloat, Component, Quat, tween, UIOpacity, Vec3 } from 'cc';
import { GameEvent } from '../event/GameEvent';
const { ccclass, property } = _decorator;

const DELAY: number = 2
@ccclass('FailWindowComponent')
export class FailWindowComponent extends Component {
    @property(UIOpacity)
    readonly cross: UIOpacity

    @property(CCFloat)
    readonly speedCrossRotation: number

    @property(CCFloat)
    readonly speedCrossScale: number

    @property(CCFloat)
    readonly speedCrossOpacity: number

    @property(UIOpacity)
    readonly retryButton: UIOpacity

    @property(CCFloat)
    readonly speedretryRotation: number

    @property(CCFloat)
    readonly speedretryScale: number

    @property(CCFloat)
    readonly speedretryOpacity: number

    protected start(): void {
        this.cross.opacity = 1
        this.cross.node.scale = Vec3.ZERO

        this.node.active = false

        GameEvent.on('CRASH', this.showCross, this)
        GameEvent.on('CRASH', this.showTryButton, this)
    }

    private showCross() {
        this.node.active = true

        let opacityTween = tween(this.cross).to(1 / this.speedCrossOpacity, { opacity: 255 })


        let quat: Quat = new Quat;
        Quat.fromEuler(quat, 0, 0, 179);
        let rotationTween = tween(this.cross.node).to(1 / this.speedCrossRotation, { rotation: quat })

        let scaleTween = tween(this.cross.node).to(1 / this.speedCrossScale, { scale: Vec3.ONE })

        this.scheduleOnce(() => {
            opacityTween.start()
            tween(this.cross.node).parallel(rotationTween, scaleTween).start()
        }, DELAY)
    }

    private showTryButton() {
        let opacityTween = tween(this.cross).to(1 / this.speedCrossOpacity, { opacity: 255 })
        let scaleTween = tween(this.cross.node).to(1 / this.speedCrossScale, { scale: Vec3.ONE })



        this.scheduleOnce(() => {
            opacityTween.start()
            scaleTween.start()
        }, DELAY)
    }
}


