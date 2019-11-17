import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TimelinePage } from './timeline.page';

const routes: Routes = [
  {
    path: ':id',
    component: TimelinePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimelinePage],
  providers: [ DatePipe ]
})
export class TimelinePageModule {

  
}
