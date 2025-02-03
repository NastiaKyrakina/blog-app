import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadChildren:
      () => import('./pages/posts-page/posts-routing')
      .then(m => m.POSTS_ROUTING)
  },
  {
    path: '**',
    redirectTo: 'posts',
    pathMatch: 'full',
  }
];
