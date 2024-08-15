import { _decorator, CCFloat, Component, Quat, sys, tween, UIOpacity, Vec3 } from 'cc';
import { GameEvent } from '../event/GameEvent';
import { URL } from '../url/URL';
const { ccclass, property } = _decorator;

const DELAY: number = 2
@ccclass('FailWindowComponent')
export class FailWindowComponent extends Component {
    @property(UIOpacity)
    readonly cross: UIOpacity

    @property(CCFloat)
    readonly speedCrossRotation: number = 1

    @property(CCFloat)
    readonly speedCrossScale: number = 1

    @property(CCFloat)
    readonly speedCrossOpacity: number = 1

    @property(UIOpacity)
    readonly retryButton: UIOpacity


    @property(CCFloat)
    readonly speedretryScale: number = 1

    @property(CCFloat)
    readonly speedretryOpacity: number = 1

    private bigScale: Vec3 = new Vec3(1.2, 1.2, 1.2)

    protected start(): void {
        this.cross.opacity = 1
        this.cross.node.scale = Vec3.ZERO

        this.node.active = false

        GameEvent.on('CRASH', this.showCross, this)
        GameEvent.on('CRASH', this.showTryButton, this)
    }

    private showCross() {

        let opacityTween = tween(this.cross).to(1 / this.speedCrossOpacity, { opacity: 255 })

        let quat: Quat = new Quat;
        Quat.fromEuler(quat, 0, 0, 179);
        let rotationTween = tween(this.cross.node).to(1 / this.speedCrossRotation, { rotation: quat })

        let scaleTween = tween(this.cross.node).to(1 / this.speedCrossScale, { scale: Vec3.ONE })

        this.scheduleOnce(() => {
            this.node.active = true

            opacityTween.start()
            tween(this.cross.node).parallel(rotationTween, scaleTween).start()
        }, DELAY)
    }

    private showTryButton() {
        let opacityTween = tween(this.retryButton).to(1 / this.speedretryOpacity, { opacity: 255 })

        let repeatTween = tween(this.retryButton.node)
            .to(this.speedretryScale, { scale: this.bigScale })
            .to(this.speedretryScale, { scale: Vec3.ONE })
            .delay(DELAY)

        let scaleTween = tween(this.retryButton.node).to(1 / this.speedretryScale, { scale: Vec3.ONE })
            .call(() => { tween(this.retryButton.node).repeatForever(repeatTween).start() })

        this.scheduleOnce(() => {
            opacityTween.start()
            scaleTween.start()
        }, DELAY)
    }

    // EDITOR
    private onDownload() {
        sys.openURL(URL.url)
    }
}