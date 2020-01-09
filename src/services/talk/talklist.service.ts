import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Room } from '../../models/room';
@Injectable({
  providedIn: 'root'
})
export class TalklistService {
  result;
  constructor() { }
  async getTalkList(id){
    try {
      let list = [];
     let ref = await firebase.firestore().collection('/solo_account/'+id+'/talkroom').orderBy('last_date', 'desc').get();
      ref.forEach(doc =>{
        list.push(new Room(doc));
      });
      this.result = {status: "success", msg: "getTimelineList is correct", data:list};
      
    } catch (error) {
      this.result = {status: "error", msg: "getTimelineList is not correct", data:[]};
    }
    return this.result;
  }
}
