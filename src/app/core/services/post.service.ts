import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { PostResponse } from '../../shared/models/api/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = `${environment.apiURL}/post`;
  private http = inject(HttpClient);

  getPosts() {
    return this.http.get<PostResponse[]>(`${this.API_URL}`);
  }
}
