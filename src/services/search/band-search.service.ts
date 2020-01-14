import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BandSearch } from '../../models/band-search';
@Injectable({
  providedIn: 'root'
})
export class BandSearchService {
  bandSearch:BandSearch;
  result;
  constructor() { }
  async getBandSearch(data){
    try{
      let list = [];
      let ref = await firebase.firestore().collection('band_account/');
      let query = ref.where("name", "==", data);
      query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
          list.push(new BandSearch(doc.id, doc.data()));
        });
      });
      this.result = {status: "success", msg: "getBandSearch is correct", data:list};
    } catch (error) {
      this.result = {status: "success", msg: "getBandSearch is not correct", data:error};
    }
    return this.result;
  }
  async getBandProfile(id){
    try{
      let list = [];
      let ref = await firebase.firestore().collection('band_account/');
      let query = ref.where("id", "==", id);
      query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
          list.push(new BandSearch(doc.id, doc.data()));
        });
      });
      this.result = {status: "success", msg: "getBandSearch is correct", data:list};
    } catch (error) {
      this.result = {status: "success", msg: "getBandSearch is not correct", data:error};
    }
    return this.result;
  }
}
