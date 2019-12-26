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
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },  { path: 'logon', loadChildren: './logon/logon.module#LogonPageModule' },
  { path: 'talklist', loadChildren: './talklist/talklist.module#TalklistPageModule' }


  // ,
  // { path: 'timeline', loadChildren: './timeline/timeline.module#TimelinePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
