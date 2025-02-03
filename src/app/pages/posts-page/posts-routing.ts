import { Route } from '@angular/router';
import { PostsPageComponent } from './posts-page.component';
import { PostsService } from './services-api/posts.service';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './store/posts.effects';
import { provideState, provideStore } from '@ngrx/store';
import { PostsReducer } from './store/posts.reducer';

export const POSTS_ROUTING: Route[] = [
  {
    path: '',
    component: PostsPageComponent,
    providers: [
      PostsService,
      provideState({name: 'posts', reducer: PostsReducer}),
      provideEffects(PostsEffects),
    ],
  }
];
