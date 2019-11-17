import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },  { path: 'post', loadChildren: './post/post.module#PostPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' }

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
