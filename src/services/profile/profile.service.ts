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
  async getAvatorURL(url,id){
    let src;
    let src_return;
    await this.getSrc(id).then(async data => {
      if (!data !=null) {
        src = data;
        await this.getUrl(src).then(url => {
          src_return = url;
        });
      } else {
        src_return="../../assets/icon/favicon.png"
      }
    });
    return src_return;
  }
  async getSrc(id){
    let src;
    let ref = await firebase.firestore().collection('solo_account/').doc(id).get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        src ="";
      } else {
        src = doc.data()["src"];
      }
    }); 
    return src;
  }
  async getUrl(url){
    let src;
    let ref = await firebase.storage().ref().child(url).getDownloadURL().then((data) => {
      if(data != null){
        src = data
      }else{
        src="../../assets/icon/favicon.png"
      }
    }); 
    return src;
  }
  async setAvatorFile(id,url,file){
    await this.setSrc(id,url);
    await this.setFile(url,file);
  }
  async setSrc(id,url){
    let src;
    await firebase.firestore().doc('solo_account/'+id).set({src:url});
  }
  async setFile(url,file){
    let src;
    firebase.storage().ref().child(url).put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }
}
