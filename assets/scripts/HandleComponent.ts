import { _decorator, Animation, CCFloat, Component, EventTouch, math, Node, tween, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HandleComponent')
export class HandleComponent extends Component {
    @property(CCFloat)
    readonly minY: number = -106

    @property(CCFloat)
    readonly maxY: number = 106

    @property(Node)
    readonly handle: Node

    @property(Animation)
    readonly tutorHandAnimation: Animation

    @property(UITransform)
    readonly hadleTransform: UITransform

    private _isTutorHandleComplete: boolean = false
    private _previousPosition: Vec3 = new Vec3()

    private _handleSpeed: number = 0
    private _diapazon: number

    protected start() {
        if (!this.handle) {
            throw ("handle is null")
        }

        this._diapazon = this.maxY - this.minY

        this._previousPosition = this.handle.worldPosition.clone()

        this.handle.on(Node.EventType.TOUCH_START, this.mouseClickStart, this);
        this.handle.on(Node.EventType.TOUCH_MOVE, this.mouseClickMove, this);
        this.handle.on(Node.EventType.TOUCH_END, this.mouseClickEnd, this);
        this.handle.on(Node.EventType.TOUCH_CANCEL, this.mouseClickEnd, this);
    }

    public get handleSpeed(): number {
        return this._handleSpeed
    }

    private mouseClickStart(event: EventTouch) {
        if (!this._isTutorHandleComplete) {
            this._isTutorHandleComplete = true

            if (this.tutorHandAnimation) {
                this.tutorHandAnimation.play()

                this.scheduleOnce(() => {
                    this.tutorHandAnimation.stop()
                })
            }
        }

        if (this.node.worldPosition != this._previousPosition)
            tween(this.handle).to(0.1, { worldPosition: this._previousPosition })
    }

    private mouseClickMove(event: EventTouch) {
        const { x, z } = this.handle.position

        let pos = new Vec3(event.getUILocation().x, event.getUILocation().y, z);
        let nodePos = this.hadleTransform.convertToNodeSpaceAR(pos);

        nodePos.x = x
        nodePos.y = math.clamp(nodePos.y, this.minY, this.maxY)

        this._handleSpeed = (nodePos.y - this.minY) / this._diapazon
        let worldPosition = this.hadleTransform.convertToWorldSpaceAR(nodePos);

        this.handle.setWorldPosition(worldPosition);
    }

    private mouseClickEnd(event: EventTouch) {
        this._previousPosition = this.handle.worldPosition.clone()
    }
}


