import { Component, OnInit, Inject, LOCALE_ID  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController} from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs.page';
import { TimelineService } from '../../services/timeline/timeline.service';
import { User } from '../../models/user';
import { Timeline } from '../../models/timeline';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  result;
  id:string;
  user:User;
  timeline:Timeline;
  timelineList: any;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public navCtrl: NavController, 
    private route: ActivatedRoute,
    public alertController: AlertController,
    private tabs: TabsPage,
    private timelineS: TimelineService,
    public datePipe: DatePipe  
    ) {

      firebase.auth().onAuthStateChanged((user) => {

        if (user) {

          this.id = this.route.snapshot.paramMap.get('id') as string;
          this.tabs.id = this.id;
          this.getTimelineList();
        }else{

          this.navCtrl.navigateBack('login');

        }

       });

   }

  ngOnInit() {

  }

  async getTimelineList(){
    this.result = await this.timelineS.getTimelineList();
    if(this.result.status === "success"){
      this.timelineList = this.result.data;
    }
  }
  onTweetbuttonClick(){
    this.navCtrl.navigateForward('post/' + this.id);
  }


}
