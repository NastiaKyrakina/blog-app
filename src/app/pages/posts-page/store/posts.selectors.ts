import { createSelector } from '@ngrx/store';
import { PostsStateType } from './posts.reducer';


export interface AppState {
  posts: PostsStateType;
}

export const selectPostsState = (state: AppState) => state.posts;

export const selectPosts = createSelector(
  selectPostsState,
  (state: PostsStateType) => state.posts
);

export const selectQueryHistory = createSelector(
  selectPostsState,
  (state: PostsStateType) => state.queryHistory
);
