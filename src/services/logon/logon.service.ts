import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class LogonService {
  result;
  auth_id;
  constructor() { }
  async logon(data){
    try {
      var ref=await firebase.firestore().doc('auth/'+data.email).get();
      console.log('data:'+ref.get('id'));
      this.auth_id = ref.get('id') as string;
      this.result = {status: "success", "msg": "signInWithEmailAndPassword is correct", ref:this.auth_id};
    } catch (error) {
      this.result = {status: "error", msg: "signInWithEmailAndPassword is not correct", ref:this.auth_id};
    }
    return this.result;
  }
}
