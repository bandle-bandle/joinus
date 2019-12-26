import { Component, OnInit } from '@angular/core';

import { TalklistService } from '../../services/talk/talklist.service';
@Component({
  selector: 'app-talklist',
  templateUrl: './talklist.page.html',
  styleUrls: ['./talklist.page.scss'],
})
export class TalklistPage implements OnInit {

  constructor(
    private Talklist_S:TalklistService,
    ) { }

  ngOnInit() {
  }

}
