import { _decorator } from 'cc';
const { ccclass } = _decorator;

const DOWNLOAD_URL = 'https://play.google.com/store/apps/details?id=com.LuB.DeliveryConstruct&hl=ruw'

@ccclass('URL')
export abstract class URL {

    private static _url: string = encodeURI(DOWNLOAD_URL)

    public static get url(): string {
        return this._url
    }
}