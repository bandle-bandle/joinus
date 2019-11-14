import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs.page';
import { TimelineService } from '../../services/timeline/timeline.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  result;
  id:string;
  constructor(
    public navCtrl: NavController, 
    private route: ActivatedRoute,
    private tabs: TabsPage,
    private timelineS: TimelineService

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

  getTimelineList(){
   this.result = this.timelineS.getTimelineList();
  }



}
