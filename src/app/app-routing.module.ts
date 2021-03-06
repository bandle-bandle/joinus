import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'login' ,pathMatch: 'full'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'post', loadChildren: './post/post.module#PostPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'logon', loadChildren: './logon/logon.module#LogonPageModule' },
  { path: 'talklist', loadChildren: './talklist/talklist.module#TalklistPageModule' },
  { path: 'talkroom', loadChildren: './talkroom/talkroom.module#TalkroomPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' }


  ,
  { path: 'timeline', loadChildren: './timeline/timeline.module#TimelinePageModule' },  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'addroom', loadChildren: './addroom/addroom.module#AddroomPageModule' },
  { path: 'post-date', loadChildren: './post-date/post-date.module#PostDatePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
