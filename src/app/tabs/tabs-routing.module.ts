import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TimelinePage } from '../timeline/timeline.page';
const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'timeline',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timeline/timeline.module').then(m => m.TimelinePageModule)
          }
        ]
      },
      {
        path: 'timeline/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timeline/timeline.module').then(m => m.TimelinePageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: ':id',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: ':id',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
