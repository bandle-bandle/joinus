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
}
