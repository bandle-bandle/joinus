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
    this.getTakRoomData().then(data=>{
      console.log('!');
    });
    this.getTalkRoomMessageList().then(data=>{
      console.log('!');
    });
  }
  getTalkRoomMessageList(){
    let result =null;
    return this.talkroom_S.getTalkRoomMessageList(this.user_id,this.talk_id).then(data=>{
      result=data;
      if(result != null){
        if(result.status === "success"){
          this.messageList = result.data;
        }
      }
      
    });
    
  }
  getTakRoomData(){
    let result;
    return this.talkroom_S.getTakRoomData(this.user_id,this.talk_id).then(data=>{
      result=data;
      if(result != null){
        if(result.status === "success"){
          this.title = result.data;
        }
      }
    });
    
  }
  ngOnInit() {
  }

}
