import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor() { }
  getFriendList(id){
    let result;
    let list = [];
    return new Promise((resolve,reject)=>{
      try {
        // タイトル取得
        let ref = firebase.firestore().collection('solo_account/'+id+'/friends/').get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc){
            list.push({
              id:doc.id,
              name:doc.data().name,
              isChecked:false
            });
          });
          result = {status: "success", msg: "getUserName is not correct",data:list};
          resolve(result);
        });  
       } catch (error) {
         result = {status: "error", msg: "getUserName is not correct"};
         console.log(result);
         reject(result);
       }
    });
  }
  async request_friend(ref1_id,ref1_item,ref2_id,ref2_item){
    let result;
    try{
      // 相手のFriendsに新規登録
      let ref1 = await firebase.firestore().collection('solo_account').doc(ref1_id).collection('friends').doc(ref2_id);
      ref1.set({
        Name:ref2_item.name,
        id:ref2_id,
        status:false,
        sender:ref1_id
       });
      // 自分のFriendsに新規登録
      let ref2 = await firebase.firestore().collection('solo_account').doc(ref2_id).collection('friends').doc(ref1_id);
      ref2.set({
        Name:ref1_item.name,
        id:ref1_id,
        status:false,
        sender:ref1_id
       });
       result = {status: "success", msg: "getTimelineList is correct"};
    }catch (error){
      result = {status: "error", msg: "エラー"};
    }
    return result;
  }
  async res_friend(ref1_id,ref1_item,ref2_id,ref2_item){
    let result;
    try{
      // 相手のFriendsに新規登録
      let ref1 = await firebase.firestore().collection('solo_account').doc(ref1_id).collection('friends').doc(ref2_id);
      ref1.update({
        status:true
       });
      // 自分のFriendsに新規登録
      let ref2 = await firebase.firestore().collection('solo_account').doc(ref2_id).collection('friends').doc(ref1_id);
      ref2.update({
        status:true
       });
       result = {status: "success", msg: "getTimelineList is correct"};
    }catch (error){
      result = {status: "error", msg: "エラー"};
    }
    return result;
  }
}
