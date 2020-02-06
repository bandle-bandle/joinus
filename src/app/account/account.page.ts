import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IonSlides} from "@ionic/angular";
import { SoloSearchService } from '../../services/search/solo-search.service';
import { BandSearchService } from '../../services/search/band-search.service';
import { RecruitSearchService } from '../../services/search/recruit-search.service';
import { ProfileService } from '../../services/profile/profile.service';
import { FriendService } from '../../services/friend/friend.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  @ViewChild(IonSlides,{static:false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  searchMode;
  sliders = {
    profile:0,
    post:1,
    friend:2,
    fun:3
  }
  my_user_id;
  type;
  result;
  solo_searchData;
  band_searchData;
  recruit_searchData;
  profile_data = {
    id:"",
    name:"",
    birthday:"",
    email:"",
    sex:"",
    profile:""
  }
  src="";
  new_src="";
  file:File;
  profile_txt="";
  post_list = [];
  friend_list = [];
  fun_list = [];
  constructor(
    private route: ActivatedRoute,
    private SoloS_S: SoloSearchService,
    private BandS_S: BandSearchService,
    private RecruitS_S: RecruitSearchService,
    private Profile_S: ProfileService,
    private Friend_S: FriendService,
  ) {
    this.my_user_id = this.route.snapshot.paramMap.get('id') as string;
    this.getSoloProfile(this.my_user_id);
    this.getAvatorURL(this.my_user_id+'/avator/'+this.my_user_id+'.jpg');
    this.Profile_S.getProfile(this.my_user_id).then(data =>{
      if(data == null){
        this.profile_txt = "まだプロフィール文が書かれてません"
      }else{
        this.profile_txt = data;
      }
    });
    this.Profile_S.getPost(this.my_user_id).then(data =>{
      this.post_list = data;
    });
    this.Profile_S.getFriends(this.my_user_id).then(data =>{
      this.friend_list = data;
    });
    this.Profile_S.getFun(this.my_user_id).then(data =>{
      this.fun_list = data;
    });
   }
   segmentChanged(ev: any) {
    this.searchMode = ev.detail.value;;
    this.slides.slideTo(this.sliders[this.searchMode], 400);
  }
   getAvatorURL(url){
     let str = this.Profile_S.getAvatorURL(url,this.my_user_id).then(data =>{
      this.src = data;
     })
   }
   async getSoloProfile(id){
    let result;
    result = await this.SoloS_S.getSoloProfile(id);
    if(result.status === "success"){
      this.profile_data = result.data;
    }
   }
   changeListener($event) : void {
    this.file = $event.target.files[0];
    this.Profile_S.setAvatorFile(this.my_user_id,this.my_user_id+'/avator/'+this.my_user_id+'.jpg',this.file);
    this.getAvatorURL(this.my_user_id+'/avator/'+this.my_user_id+'.jpg');
  }
  async res_friend(friend){
    if(friend.friend_status !=null && friend.friend_status ==false){

    }else{
      let result;
      result = await this.SoloS_S.getSoloProfile(this.my_user_id);
      if(result.status === "success"){
        await this.Friend_S.res_friend(friend.id,friend,this.my_user_id,result.data);
        friend.status =true;
      }
    }
   }
  addFun(){

  }
  createMessage(){

  }
  ngOnInit() {
  }
}
