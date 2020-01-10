import { Component, OnInit,OnChanges } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TalkroomService } from '../../services/talkroom/talkroom.service';
import { PostService } from '../../services/post/post.service';
import { Message } from '../../models/message';
import * as firebase from 'firebase';
@Component({
  selector: 'app-talkroom',
  templateUrl: './talkroom.page.html',
  styleUrls: ['./talkroom.page.scss'],
})
export class TalkroomPage implements OnInit,OnChanges {
  user_id;
  talk_id;
  result;
  title:string = "";
  chatMessage:string;
  message = {} as Message;
  messageList = new Map<string,Message>();
  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public talkroom_S:TalkroomService,
    public post_S:PostService
  ) {

    this.user_id = this.route.snapshot.paramMap.get('user_id') as string;
    this.talk_id = this.route.snapshot.paramMap.get('id') as string;
    this.getTakRoomData();
    this.getTalkRoomMessageList();
  }
  async getTalkRoomMessageList(){
    let result =null;
    return await this.talkroom_S.getTalkRoomMessageList(this.user_id,this.talk_id).then(data=>{
      result=data;
      if(result != null){
        if(result.status === "success"){
          this.messageList = result.data;
        }
      }
    });
    
  }
  async getTakRoomData(){
    let result;
    return await this.talkroom_S.getTakRoomData(this.user_id,this.talk_id).then(data=>{
      result=data;
      if(result != null){
        if(result.status === "success"){
          this.title = result.data;
        }
      }
    });
    
  }
  sendChatMessage() {
    this.sendMessage('message', new Message(
      {
        text:this.chatMessage,
        user_id:this.user_id,
        user_name:this.getUserName(this.user_id),
        datetime:new Date().toString()
      }
    ));
  }
  getUserName(id){
    return this.post_S.getUserName(id);
  }
  sendMessage(type: string, message: Message) {
    let result = this.talkroom_S.sendMessage(this.user_id,this.talk_id,message);
    
  }
  ngOnInit() {
    this.messageList;
  }
  ngOnChanges(){
    this.messageList;
  }
  trackItem(index, message):string{
    return message.id;
  }
}
