import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services-api/posts.service';
import { PostsActions } from './posts.actions';
import { catchError, exhaustMap, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPostsState } from './posts.selectors';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);
  private store = inject(Store);


  loadPosts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PostsActions.updateSearchQuery),
        withLatestFrom(this.store.select(selectPostsState)),
        switchMap(
          ([payload, state]) => {
            return this.postsService.getPosts({ query: payload.query, page: 0, size: 100 })
              .pipe(
                map((posts) => PostsActions.getPostsSuccess({
                  posts,
                  total: posts.length,
                  query: payload.query
                })),
                catchError((error) => of(PostsActions.getPostsFailure({error}))),
              )
          }),
      );
  });
}
