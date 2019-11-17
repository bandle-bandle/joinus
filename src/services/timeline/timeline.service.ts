import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Timeline } from '../../models/timeline';
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  result;
  timeline:Timeline;
  constructor() { }

  async getTimelineList() {
    try {
      let list = [];
    let ref = await firebase.firestore().collection('post').get();
      ref.forEach(doc =>{
        list.push(new Timeline(doc));
      });
      this.result = {status: "success", msg: "getTimelineList is correct", data:list};
      
    } catch (error) {
      this.result = {status: "error", msg: "getTimelineList is not correct", data:[]};
    }
    return this.result;
  }
}
