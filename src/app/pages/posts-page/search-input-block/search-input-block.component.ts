import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { PostsActions } from '../store/posts.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectQueryHistory } from '../store/posts.selectors';

@Component({
  selector: 'app-search-input-block',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-input-block.component.html',
  styleUrl: './search-input-block.component.scss'
})
export class SearchInputBlockComponent implements OnInit {

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  searchControl: FormControl<string | null> = new FormControl('');

  queryHistory = this.store.selectSignal(selectQueryHistory)

  ngOnInit() {
    this.listenToChangesSearch();
  }

  listenToChangesSearch(): void {
    this.searchControl
      .valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(
        query => this.store.dispatch(
          PostsActions.updateSearchQuery({ query: query?.trim() || '' })
        ));
  }
}
