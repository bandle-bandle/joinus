import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class LogonService {
  result;
  auth_id;
  constructor() { }

  async logon(data,auth){
    try {
      // 権限登録
      var ref=await firebase.firestore().doc('auth/'+auth.email).set({id:auth.email});
      await firebase.auth().createUserWithEmailAndPassword(auth.email,auth.password)
        .then((res: any) => console.log(res))
        .catch((error: any) => console.error(error));
      // soloアカウント作成
      var ref=await firebase.firestore().doc('solo_account/'+data.email).set(data);
      this.result = {status: "success", "msg": "signInWithEmailAndPassword is correct", ref:this.auth_id};
    } catch (error) {
      this.result = {status: "error", msg: "signInWithEmailAndPassword is not correct", ref:this.auth_id};
    }
    return this.result;
  }
}
