import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoloSearchService } from '../../services/search/solo-search.service';
import { BandSearchService } from '../../services/search/band-search.service';
import { RecruitSearchService } from '../../services/search/recruit-search.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  my_user_id;
  profile;
  type;
  result;
  solo_searchList;
  band_searchList;
  recruit_searchList;
  constructor(
    private route: ActivatedRoute,
    private SoloS_S: SoloSearchService,
    private BandS_S: BandSearchService,
    private RecruitS_S: RecruitSearchService,
  ) {
    this.my_user_id = this.route.snapshot.paramMap.get('my_user_id') as string;
    this.type = this.route.snapshot.paramMap.get('type') as string;
    this.profile = this.route.snapshot.paramMap.get('profile_id');
    switch(this.type){
      case "solo":
        console.log("solo");
        this.result = this.SoloS_S.getSoloProfile(this.profile);
        break;
      case "band":
        console.log("band");
        this.result = this.BandS_S.getBandProfile(this.profile);
        break;
      case "recruit":
        console.log("recruit");
        this.result = this.RecruitS_S.getRecruitProfile(this.profile);
        break;
      default:
        this.result = {status: "error", msg: "getSoloSearch front is not working"};
        console.log("default");
        break;
    }
    if(this.result.status === "success"){
      switch(this.type){
        case "solo":
          this.solo_searchList = this.result.data;
          break;
        case "band":
          this.band_searchList = this.result.data;
          break;
        case "recruit":
          this.recruit_searchList = this.result.data;
          break;
        default:
          break;
      }
      
    }
   }

  ngOnInit() {
  }

}
