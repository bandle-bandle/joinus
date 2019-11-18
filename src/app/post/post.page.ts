import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimelineService } from '../../services/timeline/timeline.service';
import { Timeline } from '../../models/timeline';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  providers: [ Camera ],
})
export class PostPage implements OnInit {
  id:string;
  imgSrc: string;
  constructor(
    private camera: Camera,
    private route: ActivatedRoute,
    private timelineS: TimelineService) { 
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
  }
  onPostbuttonClick(){

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
