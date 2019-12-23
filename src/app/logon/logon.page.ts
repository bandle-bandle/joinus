import { Component, OnInit } from '@angular/core';
import { LogonCheckService } from '../../services/check/logon-check.service';
import { LogonService } from '../../services/logon/logon.service';
import { SoloAccount } from '../../models/solo-account';
@Component({
  selector: 'app-logon',
  templateUrl: './logon.page.html',
  styleUrls: ['./logon.page.scss'],
})
export class LogonPage implements OnInit {
  user = {} as SoloAccount;
  password2: string;
  constructor(
    private logon_S: LogonService,
    private logonC_S: LogonCheckService,
  ) { }

  ngOnInit() {
  }
  checkmail(mail){

  }
  checkid(id){

  }
  checkpassword(password){

  }
  checkpassword2(password,password2){

  }
  async logon_button_click(user){
    this.result = await this.logon_S.logon(this.user);

    if(this.result.status === "success"){
      this.router.navigate(['home/timeline/'+this.result.ref]);
    }else if (this.result.status === "error") {
      const alert = await this.alertController.create({
        header: 'エラー',
        message: '入力に誤りがあります',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
