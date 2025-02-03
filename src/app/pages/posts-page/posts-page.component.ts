import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { SearchInputBlockComponent } from './search-input-block/search-input-block.component';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { Store } from '@ngrx/store';
import { PostsActions } from './store/posts.actions';

@Component({
  selector: 'app-posts-page',
  imports: [
    CommonModule,
    PageTitleComponent,
    SearchInputBlockComponent,
    PostsTableComponent
  ],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsPageComponent implements OnInit {

  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(PostsActions.updateSearchQuery({query: ''}));
  }
}
