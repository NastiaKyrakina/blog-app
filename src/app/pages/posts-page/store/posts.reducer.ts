import { Post } from '../../../../models/Post';
import { createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';

export type PostsStateType = {
  posts: Post[];
  loading: boolean;
  queryHistory: string[];
  page: number;
  total: number;
  error?: string | null;
}

export const InitPostsState: PostsStateType = {
  posts: [],
  loading: false,
  queryHistory: [],
  page: 0,
  total: 0,
  error: null,
};

export const PostsReducer = createReducer(InitPostsState,
  on(PostsActions.getPostsSuccess, (state, payload) => {
    const posts = [...payload.posts];
    const updatedQuery = state.queryHistory.includes(payload.query)
      ? [...state.queryHistory]
      : [...state.queryHistory, payload.query];

    return {
      ...state,
      posts: posts,
      total: payload.total,
      queryHistory: updatedQuery.slice(0, 10),
    };
  }),
  on(PostsActions.getPostsFailure, (state, payload) => ({...state, error: payload.error})),
);

