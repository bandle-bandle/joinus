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
}
