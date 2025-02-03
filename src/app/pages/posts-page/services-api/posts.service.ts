import { Post, PostRequests } from '../../../../models/Post';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../../core/http-request.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PostsService extends HttpRequestService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getPosts(params?: PostRequests): Observable<Post[]> {
    return this.http.get<Post[]>(this.url(), this.generateRequestOptions({
      title_like: params?.query || '',
  }));
  }


  url(): string {
    return `${environment.postsApi}/posts`;
  }
}
