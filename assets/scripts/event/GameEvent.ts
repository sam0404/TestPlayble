import { _decorator, EventTarget } from 'cc';
import { GameEventName } from './GameEventName';
const { ccclass } = _decorator;
// класс для работы с событиями
@ccclass('GameEvent')
export abstract class GameEvent {
  private static _event = new EventTarget();

  public static on(event: keyof typeof GameEventName, callback: (...any: any[]) => void, thisArg?: any, once?: boolean) {
    this._event.on(event, callback, thisArg, once);
  }

  public static once(event: keyof typeof GameEventName, callback: (...any: any[]) => void, thisArg?: any) {
    this._event.once(event, callback, thisArg);
  }

  public static off(event: keyof typeof GameEventName, callback?: (...any: any[]) => void, thisArg?: any): void {
    this._event.off(event, callback, thisArg);
  }

  public static emit(event: keyof typeof GameEventName, arg0?: any, arg1?: any) {
    this._event.emit(event, arg0, arg1);
  }
}