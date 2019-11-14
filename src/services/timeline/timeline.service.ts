import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  result;
  constructor() { }

  async getTimelineList() {
    try {
      let list = [];
    let ref = await firebase.firestore().doc('contribution').get();
    list = ref.get as any;
    this.result = {status: "error", msg: "getTimelineList is correct", data:list};
    } catch (error) {
      this.result = {status: "error", msg: "getTimelineList is not correct", data:[]};
    }
    return this.result;
  }
}
