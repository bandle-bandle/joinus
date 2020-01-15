import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoloSearchService } from '../../services/search/solo-search.service';
import { BandSearchService } from '../../services/search/band-search.service';
import { RecruitSearchService } from '../../services/search/recruit-search.service';
import { ProfileService } from '../../services/profile/profile.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    private SoloS_S: SoloSearchService,
    private BandS_S: BandSearchService,
    private RecruitS_S: RecruitSearchService,
    private Profile_S: ProfileService,
  ) {
    this.my_user_id = this.route.snapshot.paramMap.get('id') as string;
    this.getSoloProfile(this.my_user_id);
    this.getAvatorURL(this.my_user_id+'/avator/'+this.my_user_id+'.jpg');
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
   friendRequest(){
    this.Profile_S
   }
  addFun(){

  }
  createMessage(){

  }
  ngOnInit() {
  }
}
