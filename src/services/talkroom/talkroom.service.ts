import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Room } from '../../models/room';
import { Message } from '../../models/message';
@Injectable({
  providedIn: 'root'
})
export class TalkroomService {
title;
result;
  constructor() { }
  async getTalkRoomMessageList(user_id,talk_id){
    let chats = [];
    try {
      await firebase.database().ref(talk_id+'/').on('value',resp=>{
        if (resp) {
          resp.forEach(childSnapshot => {
            const chat = childSnapshot.val();
            chat.key = childSnapshot.key;
            chats.push(new Message(chat));
          });
          this.result = {status: "success", msg: "getUserName is correct",data:chats};
        }
      });
    }catch (error) {
      this.result = {status: "error", msg: "getUserName is not correct"};
      console.log(this.result);
    }
  }
  async getTakRoomData(user_id,talk_id){
    try {
      // タイトル取得
      let ref = await firebase.firestore().collection('solo_account/'+user_id+'/talkroom/').doc(talk_id).get().then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.title = doc.data()["title"];
          this.result = {status: "success", msg: "getUserName is correct",data:this.title};
          console.log('Document data:', this.title);
        }
      });  
     } catch (error) {
       this.result = {status: "error", msg: "getUserName is not correct"};
       console.log(this.result);
     }
  }
}
