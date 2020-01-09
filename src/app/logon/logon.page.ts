import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { LogonCheckService } from '../../services/check/logon-check.service';
import { LogonService } from '../../services/logon/logon.service';
import { LoginService } from '../../services/login/login.service';
import { SoloAccount } from '../../models/solo-account';
import { Auth } from '../../models/auth';
@Component({
  selector: 'app-logon',
  templateUrl: './logon.page.html',
  styleUrls: ['./logon.page.scss'],
})
export class LogonPage implements OnInit {
  auth = {} as Auth;
  user = {} as SoloAccount;
  password: string;
  password2: string;
  result;
  constructor(
    private logon_S: LogonService,
    private login_S: LoginService,
    private logonC_S: LogonCheckService,
    public alertController: AlertController,
    public navCtrl: NavController,
    private router: Router
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
    this.auth = new Auth(this.user.email,this.password)
    this.result = await this.logon_S.logon(this.user,this.auth);
    this.result = await this.login_S.signIn(this.auth);
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
