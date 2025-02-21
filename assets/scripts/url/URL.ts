import { _decorator, sys } from 'cc';
const { ccclass } = _decorator;

const DOWNLOAD_URL = 'https://play.google.com/store/apps/details?id=com.LuB.DeliveryConstruct&hl=ruw'
const APP_STORE_URL = 'https://apps.apple.com/ru/app/ride-master-%D0%B8%D0%B3%D1%80%D0%B0-%D0%BF%D1%80%D0%BE-%D0%BC%D0%B0%D1%88%D0%B8%D0%BD%D1%8B/id6449224139'
@ccclass('URL')
export abstract class URL {

    private static _url: string = encodeURI(DOWNLOAD_URL)

    public static init() {
        if (sys.Platform.IOS) {
            this._url = encodeURI(APP_STORE_URL)
        } else if (sys.Platform.ANDROID) {
            this._url = encodeURI(DOWNLOAD_URL)
        } else {
            this._url = encodeURI(DOWNLOAD_URL)
        }
    }

    public static get url(): string {
        return this._url
    }
}