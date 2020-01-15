import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  async friendRequest(id){
    return new Promise(async (resolve,reject)=>{
      try{
          // タイトル取得
          let solo_profile;
          let result;
          let ref = await firebase.firestore().collection('solo_account/'+id).add({id:id}).then(ref => {
            let result = {status: "error", msg: "Added document with ID: ",data:ref.id};
              resolve(result);
          });  
      }catch(error){
        let result = {status: "error", msg: "getUserName is not correct",data:error};
        console.log('Document data:', error);
        reject(result);
      }
    });
   }
  addFun(){

  }
  createMessage(){

  }
}
