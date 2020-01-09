import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TalkroomService } from '../../services/talkroom/talkroom.service';
import { Message } from '../../models/message';
@Component({
  selector: 'app-talkroom',
  templateUrl: './talkroom.page.html',
  styleUrls: ['./talkroom.page.scss'],
})
export class TalkroomPage implements OnInit {
  user_id;
  talk_id;
  result;
  title:string = "";
  message = {} as Message;
  messageList = [];
  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public talkroom_S:TalkroomService
  ) {
    this.user_id = this.route.snapshot.paramMap.get('user_id') as string;
    this.talk_id = this.route.snapshot.paramMap.get('id') as string;
    this.title = this.getTakRoomData();
    this.getTalkRoomMessageList();
  }
  async getTalkRoomMessageList(){
    this.result = await this.talkroom_S.getTalkRoomMessageList(this.user_id,this.talk_id);
    this.messageList = this.result.data;
  }
  async getTakRoomData(){
    this.result = await this.talkroom_S.getTakRoomData(this.user_id,this.talk_id);
  }
  ngOnInit() {
  }

}
