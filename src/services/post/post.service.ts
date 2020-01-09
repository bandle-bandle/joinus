import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  result;
  name:string;
  constructor() { }
  async getUserName(id){
   try {
     // ユーザー名取得
     let ref = await firebase.firestore().collection('solo_account').doc(id).get().then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
       } else {
         this.name = doc.data()["name"];
         this.result = {status: "success", msg: "getUserName is correct",data:this.name};
         console.log('Document data:', this.name);
       }
     });  
    } catch (error) {
      this.result = {status: "error", msg: "getUserName is not correct"};
      console.log(this.result);
    }
    return this.result;
  }
  async post(data){
    let post_id;
    try {
      // 投稿
      data.post_date = await firebase.firestore.Timestamp.fromDate(new Date());
      await firebase.firestore().collection('post').add({
        Text:data.Text,
        fav_count:data.fav_count,
        post_date:data.post_date,
        post_user_id:data.post_user_id,
        post_user_name:data.post_user_name,
        src:{src_type:"",src_url:""}
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        post_id = ref.id;
      });
      await firebase.firestore().collection('solo_account/'+data.post_user_id+'/post/').doc(post_id).set({
        Text:data.Text,
        fav_count:data.fav_count,
        post_date:data.post_date,
        post_user_id:data.post_user_id,
        post_user_name:data.post_user_name,
        src:{src_type:"",src_url:""}
      });
      this.result = {status: "success", "msg": "post is correct"};
    } catch (error) {
      this.result = {status: "error", msg: "post is not correct",data:data};
      console.log(this.result);
    }
    return this.result;
  }

}
