import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  
  id:string;

  constructor(
    public navCtrl: NavController, 
    private route: ActivatedRoute,
    private tabs: TabsPage
    ) {

      firebase.auth().onAuthStateChanged((user) => {

        if (user) {

          this.id = this.route.snapshot.paramMap.get('id') as string;
          this.tabs.id = this.id;
        }else{

          this.navCtrl.navigateBack('login');

        }

       });

   }

  ngOnInit() {

  }




}
