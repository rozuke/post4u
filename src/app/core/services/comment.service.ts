import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CommentRequestDTO,
  CommentResponseDTO,
  Comment,
} from '../../shared/models/api/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly API_URL = `${environment.apiURL}`;
  private http = inject(HttpClient);
  constructor() {}

  postComment(comment: CommentRequestDTO) {
    return this.http.post<Comment>(`${this.API_URL}/comment`, comment);
  }

  getCommentsByPostId(postId: string) {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<CommentResponseDTO[]>(`${this.API_URL}/comment`, {
      params,
    });
  }

  deleteComment(commentId: string) {
    return this.http.delete(`${this.API_URL}/comment/${commentId}`);
  }

  pathComment(commentId: string, comment: CommentRequestDTO) {
    return this.http.patch<Comment>(
      `${this.API_URL}/comment/${commentId}`,
      comment
    );
  }
}
