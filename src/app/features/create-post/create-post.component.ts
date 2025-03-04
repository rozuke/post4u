import { Component, inject } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { PostDTO } from '../../shared/models/api/post.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-create-post',
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
export class CreatePostComponent {
  private readonly fb = inject(FormBuilder);
  private readonly postService = inject(PostService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  public postForm: FormGroup = this.fb.group({
    text: [
      '',
      [Validators.required, Validators.minLength(1), wordCountValidator(120)],
    ],
  });

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const newPost: PostDTO = {
      author: this.userService.getUserId(),
      text: this.postForm.value.text,
    };

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
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
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
