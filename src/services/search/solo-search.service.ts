import { Injectable } from '@angular/core';
import { SoloSearch } from '../../models/solo-search';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class SoloSearchService {
  soloSearch:SoloSearch;
  result;
  constructor() { }
  async getSoloSearch(data){
    try{
      let list = [];
      let ref = await firebase.firestore().collection('solo_account/');
      let query = ref.where("name", "==", data);
      query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
          list.push(new SoloSearch(doc.id, doc.data()));
        });
      });
      this.result = {status: "success", msg: "getSoloSearch is correct", data:list};
    } catch (error) {
      this.result = {status: "success", msg: "getSoloSearch is not correct", data:error};
    }
    return this.result;
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
