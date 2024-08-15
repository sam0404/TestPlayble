import { _decorator, CCFloat, Component, sys, tween, UIOpacity } from 'cc';
import { GameEvent } from '../event/GameEvent';
import { URL } from '../url/URL';
const { ccclass, property, requireComponent } = _decorator;


@ccclass('DownloadComponent')
@requireComponent(UIOpacity)
export class DownloadComponent extends Component {
    @property(CCFloat)
    readonly delay: number = 1

    @property(CCFloat)
    readonly hideSpeed: number = 0.5

    private opacity: UIOpacity

    protected start() {
        this.opacity = this.node.getComponent(UIOpacity)

        GameEvent.on("CRASH", this.hide, this)
    }

    private hide() {
        this.scheduleOnce(() => {
            tween(this.opacity).to(this.hideSpeed, { opacity: 1 }).start()
        }, this.delay)
    }

    // EDITOR
    private onDownload() {
        sys.openURL(URL.url)
    }
}