import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController} from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs.page';
import { TimelineService } from '../../services/timeline/timeline.service';
import { Auth } from '../../models/auth';
import { Timeline } from '../../models/timeline';
import { ProfileService } from '../../services/profile/profile.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  result;
  id:string;
  user:Auth;
  timeline:Timeline;
  timelineList: any;
  my_src = "";
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public navCtrl: NavController, 
    private route: ActivatedRoute,
    public alertController: AlertController,
    private tabs: TabsPage,
    private timelineS: TimelineService,
    public datePipe: DatePipe,
    private Profile_S: ProfileService,
    ) {

      firebase.auth().onAuthStateChanged((user) => {

        if (user) {

          this.id = this.route.snapshot.paramMap.get('id') as string;
          this.tabs.id = this.id;
          this.getAvatorURL(this.id+'/avator/'+this.id+'.jpg');
          this.getTimelineList();
        }else{

          this.navCtrl.navigateBack('login');

        }

       });

   }

  ngOnInit() {

  }
  refreshAction(event){
    this.getTimelineListReflesh(event);
    
  }
  async getTimelineList(){
    this.result = await this.timelineS.getTimelineList();
    if(this.result.status === "success"){
      this.timelineList = this.result.data;
    }
  }
  async getTimelineListReflesh(event){
    this.result = await this.timelineS.getTimelineList();
    if(this.result.status === "success"){
      this.timelineList = this.result.data;
      event.target.complete();
    }
  }
  onTweetbuttonClick(){
    this.navCtrl.navigateForward('post/' + this.id);
  }
  profile(id){
    if(id ==this.id){
      let searchMode = "solo"
      this.navCtrl.navigateForward('account/'+this.id);
    }else{
      let searchMode = "solo"
    this.navCtrl.navigateForward('profile/'+this.id+'/'+searchMode+'/'+id);
    }
  }
  getAvatorURL(url){
    let str = this.Profile_S.getAvatorURL("",this.id).then(data =>{
     this.my_src = data;
    })
  }
}
