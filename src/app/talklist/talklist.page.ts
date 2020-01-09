import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TalklistService } from '../../services/talk/talklist.service';
@Component({
  selector: 'app-talklist',
  templateUrl: './talklist.page.html',
  styleUrls: ['./talklist.page.scss'],
})
export class TalklistPage implements OnInit {
  id:string;
  result;
  rooms: any;
  constructor(
    private route: ActivatedRoute,
    private talklist_S:TalklistService,
    public navCtrl: NavController
    ) { 
      this.id = this.route.snapshot.paramMap.get('id') as string;
      this.getTalkList();
    }
  async getTalkList(){
    this.result = await this.talklist_S.getTalkList(this.id);
    if(this.result.status === "success"){
      this.rooms = this.result.data;
    }
  }
  joinRoom(id){
    this.navCtrl.navigateForward('talkroom/'+this.id+'/'+id);
  }
  onCreatebuttonClick(){

  }
  ngOnInit() {
  }

}
