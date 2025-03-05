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
  CommentResponseDTO,
} from '../../shared/models/api/comment.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

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
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private commentService = inject(CommentService);
  private postService = inject(PostService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  postData: PostResponseDTO = {} as PostResponseDTO;
  postId: string | null = null;
  comments: CommentResponseDTO[] = [];
  editingCommentId: string | null = null;

  public userId: string | null = null;

  public commentForm: FormGroup;
  public editCommentForm: FormGroup;
  constructor() {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.editCommentForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
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
          console.log('comments');
          console.log(comments);
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
      author: this.userId!,
      post: this.postId!,
    };

    this.commentService.postComment(newComment).subscribe(comment => {
      this.loadComments();
      this.commentForm.reset();
    });
  }

  onEditSubmit(commentId: string): void {
    if (this.editCommentForm.invalid) {
      return;
    }

    const updatedComment: CommentRequestDTO = {
      text: this.editCommentForm.value.text,
      author: this.postData.author._id,
      post: this.postId!,
    };

    this.commentService.pathComment(commentId, updatedComment).subscribe(() => {
      this.loadComments();
      this.editingCommentId = null;
    });
  }

  editCommentHandler(comment: CommentResponseDTO): void {
    this.editingCommentId = comment._id;
    this.editCommentForm.patchValue({ text: comment.text });
  }

  cancelEdit(): void {
    this.editingCommentId = null;
  }

  deletePostHandler(commentId: string): void {
    const dialog = this.dialog.open(ConfirmDialogComponent);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.deleteComment(commentId).subscribe(() => {
          this.loadComments();
        });
      }
    });
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
