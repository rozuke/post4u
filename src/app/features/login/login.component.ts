import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { passwordStrengthValidator } from '../../shared/validators/strong-password-validator';
import { ScreenService } from '../../core/services/screen.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private screenService = inject(ScreenService);
  private screenSubscription!: Subscription;
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);

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

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { sessionExpired: boolean };
    if (state?.sessionExpired) {
      this.snackBar.open('Session expired. Please log in again.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

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

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.userService.getProfile().subscribe(() => {
          this.loading = false;
          this.router.navigate(['/']);
        });
      },
      error: error => {
        this.errorMessage = `${error}`;
        this.loading = false;
      },
    });
  }
}
