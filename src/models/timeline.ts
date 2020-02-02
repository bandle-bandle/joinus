
import { Auth } from './auth';


export class Timeline {
  id:string;
  text: string;
  src: string;
  src_type: string;
  post_date: string;
  post_user_id:string;
  post_user_name:string;
  post_user_avator:string;
  fav_count:number;
    constructor(data,src){
        
        this.id = data.id;
        this.text = data.data().Text;
        this.post_date = data.data().post_date.toDate();
        this.src = data.data().src;
        this.post_user_id = data.data().post_user_id;
        this.post_user_name = data.data().post_user_name;
        this.post_user_avator = src;
        this.fav_count = data.data().fav_count;
    }
}