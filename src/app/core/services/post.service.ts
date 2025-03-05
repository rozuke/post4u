import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { PostDTO, PostResponseDTO } from '../../shared/models/api/post.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = `${environment.apiURL}/post`;
  private http = inject(HttpClient);

  getPosts() {
    return this.http.get<PostResponseDTO[]>(`${this.API_URL}`);
  }

  createPost(post: PostDTO) {
    return this.http.post(`${this.API_URL}`, post);
  }

  getPostByUserId(userId: string): Observable<PostResponseDTO[]> {
    return this.getPosts().pipe(
      map(posts =>
        posts.filter(post => {
          console.log('Post author: ', post.author._id);
          console.log('User ID: ', userId);
          return post.author._id === userId;
        })
      )
    );
  }
}
