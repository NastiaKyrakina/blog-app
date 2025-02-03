import { createActionGroup, props } from '@ngrx/store';
import { Post, PostRequests } from '../../../../models/Post';

export const PostsActions = createActionGroup({
  source: 'posts',
  events: {
    'Get Posts': props<PostRequests>(),
    'Get Posts Success': props<{ posts: Post[]; total: number; query: string }>(),
    'Get Posts Failure': props<{ error: string }>(),
    'Update Search Query': props<{ query: string }>(),
    'Add New Search Query': props<{ query: string }>(),
    'Update Pagination': props<{ page: number; pageSize: number }>(),
  },
});

