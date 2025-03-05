import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { PostDTO, PostResponseDTO } from '../../shared/models/api/post.model';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = `${environment.apiURL}/post`;
  private http = inject(HttpClient);
  private readonly commentsService = inject(CommentService);

  getPosts() {
    return this.http.get<PostResponseDTO[]>(`${this.API_URL}`);
  }

  getPostById(postId: string) {
    return this.http.get<PostResponseDTO>(`${this.API_URL}/${postId}`);
  }

  patchPost(postId: string, post: PostDTO) {
    return this.http.patch(`${this.API_URL}/${postId}`, post);
  }

  createPost(post: PostDTO) {
    return this.http.post(`${this.API_URL}`, post);
  }

  getPostByUserId(userId: string): Observable<PostResponseDTO[]> {
    return this.getPostsWithCommentCounts().pipe(
      map(posts =>
        posts.filter(post => {
          return post.author._id === userId;
        })
      )
    );
  }

  deletePost(postId: string) {
    return this.http.delete(`${this.API_URL}/${postId}`);
  }

  getPostsWithCommentCounts(): Observable<PostResponseDTO[]> {
    return this.getPosts().pipe(
      map(posts => {
        const postObservables = posts.map(post =>
          this.commentsService.getCommentsByPostId(post._id).pipe(
            map(comments => ({
              ...post,
              commentsCount: comments.length,
            }))
          )
        );
        return forkJoin(postObservables);
      }),
      mergeMap(postsWithComments => postsWithComments)
    );
  }
}
