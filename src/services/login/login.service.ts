import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Auth } from '../../models/auth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:Auth;
  result;
  auth_id;
  
  constructor() { }

  async signIn(data) {

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      var ref=await firebase.firestore().doc('auth/'+data.email).get();
      console.log('data:'+ref.get('id'));
      this.auth_id = ref.get('id') as string;
      this.result = {status: "success", "msg": "signInWithEmailAndPassword is correct", ref:this.auth_id};
    } catch (error) {
      this.result = {status: "error", msg: "signInWithEmailAndPassword is not correct", ref:this.auth_id};
    }
    return this.result;
  }

  setUser(user){
    this.user = user;
  }
  getUser(){
    return this.user;
  }
}
