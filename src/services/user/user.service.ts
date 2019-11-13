import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User;
  constructor() { }

  

  setUser(user){
    this.user = user;
  }
  getUser(){
    return this.user;
  }

}
