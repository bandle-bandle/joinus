import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams, ModalController, NavController} from '@ionic/angular';
import { FriendService } from '../../services/friend/friend.service';
import { TalklistService } from '../../services/talk/talklist.service';
@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.page.html',
  styleUrls: ['./addroom.page.scss'],
})
export class AddroomPage implements OnInit {
  id;
  friendList =[];
  title="";
  constructor(
    private route: ActivatedRoute,
    public modalCtrl:ModalController,
    public friend_S:FriendService,
    public talklist_S:TalklistService,
    public navCtrl: NavController
  ) {
    let result;
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.friend_S.getFriendList(this.id).then(data=>{
      result=data;
      if(result != null){
        if(result.status === "success"){
          this.friendList = result.data;
        }
      }
    });
   }
   onCreateClick(){
    let list = this.friendList.filter((item) =>item.isChecked == true);
    this.talklist_S.createPublicTalkRoom(this.id,this.title,list);
    this.navCtrl.back();
   }
  ngOnInit() {
  }

}
