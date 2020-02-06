import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoloSearchService } from '../../services/search/solo-search.service';
import { BandSearchService } from '../../services/search/band-search.service';
import { RecruitSearchService } from '../../services/search/recruit-search.service';
import { ProfileService } from '../../services/profile/profile.service';
import { FriendService } from '../../services/friend/friend.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  my_user_id;
  profile_id;
  type;
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
  constructor(
    private route: ActivatedRoute,
    private SoloS_S: SoloSearchService,
    private BandS_S: BandSearchService,
    private RecruitS_S: RecruitSearchService,
    private Profile_S: ProfileService,
    private Friend_S: FriendService,
  ) {
    let result;
    this.my_user_id = this.route.snapshot.paramMap.get('my_user_id') as string;
    this.type = this.route.snapshot.paramMap.get('type') as string;
    this.profile_id = this.route.snapshot.paramMap.get('profile_id');
    switch(this.type){
      case "solo":
        console.log("solo");
        this.getSoloProfile(this.profile_id);
        break;
      case "band":
        console.log("band");
        result = this.BandS_S.getBandProfile(this.profile_id);
        break;
      case "recruit":
        console.log("recruit");
        result = this.RecruitS_S.getRecruitProfile(this.profile_id);
        break;
      default:
        result = {status: "error", msg: "getSoloSearch front is not working"};
        console.log("default");
        break;
    }
   }
   async getSoloProfile(id){
    let result;
    result = await this.SoloS_S.getSoloProfile(this.profile_id);
    if(result.status === "success"){
      this.profile_data = result.data;
    }
    // return await new Promise(async(resolve,reject)=>{
    //   result = await this.SoloS_S.getSoloProfile(this.profile_id).then((data)=>{
    //     result=data;
    //     if(result != null){
    //       if(result.status === "success"){
    //         resolve(result.data);
    //       }
    //     }
    //   });
    // });
   }
   async friendRequest(){
    let result;
    result = await this.SoloS_S.getSoloProfile(this.my_user_id);
    if(result.status === "success"){
      await this.Friend_S.request_friend(this.profile_id,this.profile_data,this.my_user_id,result.data);
    }
   }
  addFun(){

  }
  createMessage(){

  }
  ngOnInit() {
  }
}
