import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Post } from '../../../../models/Post';
import { Store } from '@ngrx/store';
import { selectPosts } from '../store/posts.selectors';

@Component({
  selector: 'app-posts-table',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsTableComponent {

  private store = inject(Store);

  readonly ROW_HEIGHT = 41;

  posts = this.store.selectSignal(selectPosts)

  trackByItemId(index: number, item: Post): number {
    return item.id;
  }
}
