import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertingService {
  tempToast = true;
  tempSmsgVar = new BehaviorSubject<any>("");
  tempSToastVar = new BehaviorSubject<any>(false);
  tempFToastVar = new BehaviorSubject<any>(false);
  tempMsgVar = new BehaviorSubject<any>("");
  constructor() { }

  success(Smsg: any, message: any, time: any) {
    this.tempSToastVar.next(true);
    this.tempMsgVar.next(message);
    this.tempSmsgVar.next(Smsg);
    setTimeout(() => {
      this.tempSToastVar.next(false);
      this.tempMsgVar.next('');
      this.tempSmsgVar.next('');
    }, time * 1000)
  }

  error(Smsg: any, message: any, time: any) {
    this.tempFToastVar.next(true);
    this.tempMsgVar.next(message);
    this.tempSmsgVar.next(Smsg);
    setTimeout(() => {
      this.tempFToastVar.next(false);
      this.tempMsgVar.next('');
      this.tempSmsgVar.next('');
    }, time * 1000)
  }

  message(message: string, duration = 3500) {

  }
}
