import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController} from '@ionic/angular';
import {IonSlides} from "@ionic/angular";
import { SoloSearchService } from '../../services/search/solo-search.service';
import { BandSearchService } from '../../services/search/band-search.service';
import { RecruitSearchService } from '../../services/search/recruit-search.service';
import { FriendService } from '../../services/friend/friend.service';
import { FunService } from '../../services/fun/fun.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  my_user_id;
  @ViewChild(IonSlides,{static:false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  searchMode;
  placeholder;
  placeholders = {
    solo:"ソロアカウント検索",
    band:"バンドアカウント検索",
    recruit:"募集検索"
  }
  sliders = {
    solo:0,
    band:1,
    recruit:2
  }
  result;
  solo_searchList: any;
  band_searchList: any;
  recruit_searchList: any;
  constructor(
    private Fun_S: FunService,
    private Friend_S: FriendService,
    private SoloS_S: SoloSearchService,
    private BandS_S: BandSearchService,
    private RecruitS_S: RecruitSearchService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
  ) {
    this.my_user_id = this.route.snapshot.paramMap.get('id') as string;
    this.searchMode = "solo";
    this.placeholder = this.placeholders["solo"];
   }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.searchMode = ev.detail.value;
    this.placeholder = this.placeholders[this.searchMode];
    this.slides.slideTo(this.sliders[this.searchMode], 400);
  }

  async search(ev: any){
    let result;
    const query = ev.target.value;
    switch(this.searchMode){
      case "solo":
        this.solo_searchList =null;
        console.log("solo");
        this.SoloS_S.getSoloSearch(query,this.my_user_id).then(data =>{
          result = data;
          if(result.status === "success"){
            this.solo_searchList = result.data;
          }
        });
        break;
      case "band":
        console.log("band");
        result = await this.BandS_S.getBandSearch(query);
        break;
      case "recruit":
        console.log("recruit");
        result = await this.RecruitS_S.getRecruitSearch(query);
        break;
      default:
        result = {status: "error", msg: "getSoloSearch front is not working"};
        console.log("default");
        break;
    }
  }
  solo_click(search){
    this.navCtrl.navigateForward('profile/'+this.my_user_id+'/'+this.searchMode+'/'+search.id);
  }
  async request_friend(search){
    if(search.friend.status !=null && search.friend.status ==false){

    }else{
      let result;
      result = await this.SoloS_S.getSoloProfile(this.my_user_id);
      if(result.status === "success"){
        await this.Friend_S.request_friend(search.id,search,this.my_user_id,result.data);
        search.friend_status =false;
      }
    }
  }
  add_fun(search){

  }
}
