import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../core/services/post.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { wordCountValidator } from '../../shared/validators/word-count-validator';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { PostDTO } from '../../shared/models/api/post.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-create-update-post',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    NgIf,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreateUpdatePostComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly postService = inject(PostService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly location = inject(Location);

  public postForm: FormGroup = this.fb.group({
    text: [
      '',
      [Validators.required, Validators.minLength(1), wordCountValidator(120)],
    ],
  });

  public isEditMode = false;
  private postId: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId');
      if (this.postId) {
        this.isEditMode = true;
        this.loadPostData(this.postId);
      }
    });
  }

  private loadPostData(postId: string): void {
    this.postService.getPostById(postId).subscribe(post => {
      this.postForm.patchValue({
        text: post.text,
      });
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const newPost: PostDTO = {
      author: this.userService.getUserId(),
      text: this.postForm.value.text,
    };

    if (this.isEditMode && this.postId) {
      this.updatePost(newPost);
    } else {
      this.savePost(newPost);
    }
  }

  private updatePost(updatedPost: PostDTO): void {
    this.postService.patchPost(this.postId!, updatedPost).subscribe({
      next: () => {
        this.snackBar
          .open('Post updated successfully!', 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          .afterDismissed()
          .subscribe(() => {
            this.location.back();
          });
      },
      error: () => {
        this.snackBar.open(
          'Failed to update post. Please try again.',
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      },
    });
  }

  private savePost(newPost: PostDTO) {
    this.postService.createPost(newPost).subscribe({
      next: () => {
        this.snackBar
          .open('Post created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          .afterDismissed()
          .subscribe(() => {
            this.location.back();
          });
        this.postForm.reset();
      },
      error: () => {
        this.snackBar.open(
          'Failed to create post. Please try again.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      },
    });
  }
}
