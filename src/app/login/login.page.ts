import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  result;
  user = {} as User;
  constructor(
    private login_S: LoginService,
    public alertController: AlertController,
    public navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  async login_button_click(){

    this.result = await this.login_S.signIn(this.user);

    if(this.result.status === "success"){
     // this.navCtrl.navigateForward('home/timeline/'+this.result.ref);
      this.router.navigate(['home/timeline/${this.result.ref}']);
    }else if (this.result.status === "error") {
      const alert = await this.alertController.create({
        header: 'エラー',
        message: '入力に誤りがあります',
        buttons: ['OK']
      });
    }
  }
}
