import { Injectable } from '@angular/core';
import { SoloSearch } from '../../models/solo-search';
import { Friend } from '../../models/friend';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class SoloSearchService {
  soloSearch:SoloSearch;
  result;

  constructor() { }

  async getSoloSearch(data,my_user_id){
    let result;
    return new Promise((resolve,reject)=>{
      try{
        let list = [];
        let ref = firebase.firestore().collection('solo_account/');
        let query = ref.where("name","==",data);
        // ソロアカウントからキーワード検索
        query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc){
            // 該当リストのFriend申請状態を取得
            let ref = firebase.firestore().collection('solo_account/'+my_user_id+'/friends/').doc(doc.id).get().then(doc2 =>{
              if (!doc2.exists) {
                list.push(new SoloSearch(doc.id, doc.data(),null));
              } else {
                list.push(new SoloSearch(doc.id, doc.data(),new Friend(doc2.data())));
              }
            });
          });
          result = {status: "success", msg: "getSoloSearch is correct", data:list};
          resolve(result);
        });
      } catch (error) {
        result = {status: "success", msg: "getSoloSearch is not correct", data:error};
        reject(result);
      }
    });
  }
  async getSoloProfile(id){
    return new Promise((resolve,reject)=>{
      try{
          // タイトル取得
          let solo_profile;
          let result;
          let ref = firebase.firestore().collection('solo_account/').doc(id).get().then(doc => {
            if (!doc.exists) {
              let result = {status: "error", msg: "getUserName is not correct",data:'No such document!'};
              console.log('Document data:', 'No such document!');
              reject(result);
            } else {
              solo_profile = {
                id:doc.id,
                name:doc.data()["name"],
                birthday:doc.data()["birthday"],
                email:doc.data()["email"],
                sex:doc.data()["sex"],
                profile:doc.data()["profile"]
              }
              result = {status: "success", msg: "getUserName is correct",data:solo_profile};
              console.log('Document data:', solo_profile);
              resolve(result);
            }
          });  
      }catch(error){
        let result = {status: "error", msg: "getUserName is not correct",data:error};
        console.log('Document data:', error);
        reject(result);
      }
      
    });
  }
}
