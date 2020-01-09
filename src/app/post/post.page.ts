import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  providers: [ Camera ],
})
export class PostPage implements OnInit {
  result;
  result2;
  id:string;
  imgSrc: string;
  data = {} as Post;
  constructor(
    private camera: Camera,
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    public alertController: AlertController,
    private post_S: PostService
    ) {
    this.data = new Post();
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
  }
  async onPostbuttonClick(){
    this.data.post_user_id = this.id;
    this.result =await this.post_S.getUserName(this.id);
    
    if(this.result.status === "success"){
      this.data.post_user_name = this.result.data;
      this.result2 =await this.post_S.post(this.data);
      if(this.result2.status === "success"){
        
      }else if (this.result2.status === "error") {
        const alert = await this.alertController.create({
          header: 'エラー',
          message: this.result.msg,
          buttons: ['OK']
        });
        alert.present();
      }
    }else if (this.result.status === "error") {
      const alert = await this.alertController.create({
        header: 'エラー',
        message: this.result.msg,
        buttons: ['OK']
      });
      alert.present();
    }
    this.router.navigate(['home/timeline/'+this.result.ref]);
  }
  takePicture(){
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
     }, (err) => {
      // Handle error
     });
  }
}
