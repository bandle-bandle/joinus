import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { RecruitSearch } from '../../models/recruit-search';
@Injectable({
  providedIn: 'root'
})
export class RecruitSearchService {
  recruitSearch:RecruitSearch;
  result;
  constructor() { }
  async getRecruitSearch(data){
    try{
      let ref = await firebase.firestore().collection('recruit/');
      let query = ref.where("user_name", "==", data);
      this.result = {status: "success", msg: "getSoloSearch is correct", ref:query};
    }catch (error) {
      this.result = {status: "success", msg: "getSoloSearch is not correct", ref:error};
    }
    return this.result;
  }
}
