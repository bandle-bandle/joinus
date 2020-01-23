import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Room } from '../../models/room';
import { Message } from '../../models/message';
@Injectable({
  providedIn: 'root'
})
export class TalkroomService {
title;
  constructor() { }
  getTalkRoomMessageList(user_id,talk_id){
    let result;
    let chats = new Map<string,Message>();
    let msg;
    return new Promise((resolve,reject)=>{
      try {
        firebase.database().ref(talk_id+'/').on('value',resp=>{
          if (resp) {
            resp.forEach(childSnapshot => {
              const chat = childSnapshot.val();
              chat.key = childSnapshot.key;
              msg = new Message(chat);
              msg.id = chat.key;
              chats.set(msg.id,msg);
            });
            result = {status: "success", msg: "getUserName is correct",data:chats};
            resolve(result);
          }
        });
      }catch (error) {
        result = {status: "error", msg: "getUserName is not correct"};
        console.log(result);
        reject(result);
      }
    });
  }
  getTakRoomData(user_id,talk_id){
    let result;
    return new Promise((resolve,reject)=>{
      try {
        // タイトル取得
        let ref = firebase.firestore().collection('solo_account/'+user_id+'/talkroom/').doc(talk_id).get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            this.title = doc.data()["Title"];
            result = {status: "success", msg: "getUserName is correct",data:this.title};
            console.log('Document data:', this.title);
            resolve(result);
          }
        });  
       } catch (error) {
         result = {status: "error", msg: "getUserName is not correct"};
         console.log(result);
         reject(result);
       }
    });
  }
  sendMessage(user_id,talk_id,data) {
    let result;
      try {
        const newdata = firebase.database().ref(talk_id).push();
        data.id = newdata.key;
        newdata.set(data);
        result = {status: "error", msg: "getUserName is correct",data:data};
      }catch (error) {
        result = {status: "error", msg: "getUserName is not correct"};
        console.log(result);
      }
      return result;
  }
}
