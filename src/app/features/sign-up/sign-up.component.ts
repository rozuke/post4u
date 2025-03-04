import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { passwordStrengthValidator } from '../../shared/validators/strong-password-validator';
import { ScreenService } from '../../core/services/screen.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    NgIf,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private screenService = inject(ScreenService);
  private screenSubscription!: Subscription;
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator(),
      ],
    ],
  });

  errorMessage = '';
  loading = false;
  isDesktop = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {
    this.screenSubscription = this.screenService.isDesktop$.subscribe(
      isDesktop => {
        this.isDesktop = isDesktop;
      }
    );
  }
  ngOnDestroy() {
    if (this.screenSubscription) {
      this.screenSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.registerForm.invalid || this.loading) return;

    this.loading = true;
    const { email, password } = this.registerForm.value;

    this.authService.register(email!, password!).subscribe({
      next: response => {
        this.loading = false;
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        setTimeout(() => {
          this.authService.login(email!, password!).subscribe({
            next: response => {
              this.loading = false;
              this.router.navigate(['/']);
            },
            error: error => {
              this.errorMessage = `${error}`;
              this.loading = false;
            },
          });
        }, 2000);
      },
      error: error => {
        this.errorMessage = `${error}`;
        this.loading = false;
      },
    });
  }
}
