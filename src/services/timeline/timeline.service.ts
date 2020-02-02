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
     let ref = await firebase.firestore().collection('post').orderBy('post_date', 'desc').get();
      ref.forEach(doc =>{
        let src;
        // アバター画像URL生成
        firebase.storage().ref(doc.data().post_user_avator).getDownloadURL().then( url =>{
          src = url;
          list.push(new Timeline(doc,src));
        });
      });
      this.result = {status: "success", msg: "getTimelineList is correct", data:list};
      
    } catch (error) {
      this.result = {status: "error", msg: "getTimelineList is not correct", data:[]};
    }
    return this.result;
  }
}
