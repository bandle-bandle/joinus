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
        list.push({
          Title:doc.data().Title,
          id:doc.id
        });
      });
      this.result = {status: "success", msg: "getTimelineList is correct", data:list};
      
    } catch (error) {
      this.result = {status: "error", msg: "getTimelineList is not correct", data:[]};
    }
    return this.result;
  }
  async createPublicTalkRoom(id,title,friends){
    try {
      let list = [];
      // talkroom登録
     let add_ref = await firebase.firestore().collection('talkroom').doc();
     add_ref.set({
      Title:title,
      id:add_ref.id,
      last_date:firebase.firestore.Timestamp.fromDate(new Date())
     }).then(async (ref)=>{
      friends.forEach(async item =>{
        await firebase.firestore().collection('talkroom/'+add_ref.id+'/member/').doc(item.id).set({
          Name:item.name,
          id:item.id
         });
      });
      // 自身のtalkroom登録
      await firebase.firestore().collection('solo_account/'+id+'/talkroom/').doc(add_ref.id).set({
        Title:title,
        id:add_ref.id,
        last_date:firebase.firestore.Timestamp.fromDate(new Date())
       });
       // Friendのtalkroom登録(フレンド存在チェックが必要)
      friends.forEach(async item =>{
        await firebase.firestore().collection('solo_account/'+item.id+'/talkroom/').doc(add_ref.id).set({
          Title:title,
          id:add_ref.id,
          last_date:firebase.firestore.Timestamp.fromDate(new Date())
         });
      });
     });
    this.result = {status: "success", msg: "getTimelineList is correct", data:list};
      
    } catch (error) {
      this.result = {status: "error", msg: "getTimelineList is not correct", data:[]};
    }
    return this.result;
  }
}
