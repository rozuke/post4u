import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../core/services/comment.service';
import { PostResponseDTO } from '../../shared/models/api/post.model';
import { PostService } from '../../core/services/post.service';
import {
  CommentRequestDTO,
  Comment,
} from '../../shared/models/api/comment.model';

@Component({
  selector: 'app-comment-post',
  imports: [
    MatCardModule,
    InitialsPipe,
    MatTabsModule,
    TimeAgoPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private commentService = inject(CommentService);
  private postService = inject(PostService);
  postData: PostResponseDTO = {} as PostResponseDTO;
  postId: string | null = null;
  comments: PostResponseDTO[] = [];

  public commentForm: FormGroup;
  constructor() {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('postId');
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(post => {
        this.postData = post;
        this.loadComments();
      });
    }
  }

  loadComments(): void {
    if (this.postId) {
      this.commentService
        .getCommentsByPostId(this.postId)
        .subscribe(comments => {
          this.comments = comments.reverse();
        });
    }
  }

  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }

    const newComment: CommentRequestDTO = {
      text: this.commentForm.value.text,
      author: this.postData.author._id,
      post: this.postId!,
    };

    console.log('NEW COMMENT', newComment);

    this.commentService.postComment(newComment).subscribe(comment => {
      this.loadComments();
      this.commentForm.reset();
    });
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
