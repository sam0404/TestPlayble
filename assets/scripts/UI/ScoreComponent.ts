import { _decorator, Component, Label } from 'cc';
import { GameEvent } from '../event/GameEvent';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('ScoreComponent')
@requireComponent(Label)
export class ScoreComponent extends Component {
    private coinText: Label

    private coinQuantity: number = 0

    protected start() {
        this.coinText = this.node.getComponent(Label)

        this.updateLabel()

        GameEvent.on("COIN_COLLECT", this.onCollectCoin, this)
    }

    private onCollectCoin() {
        this.coinQuantity++;
        this.updateLabel()
    }

    private updateLabel() {
        this.coinText.string = this.coinQuantity.toString()
    }
}


