import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { passwordStrengthValidator } from '../../shared/validators/strong-password-validator';

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

  isDesktop = window.innerWidth >= 1024;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth >= 1024;
  }

  ngOnInit() {
    this.isDesktop = window.innerWidth >= 1024;
  }

  onSubmit() {
    if (this.registerForm.invalid || this.loading) return;

    this.loading = true;
    const { email, password } = this.registerForm.value;

    this.authService.register(email!, password!).subscribe({
      next: response => {
        console.log('register succesfull');
        console.log(response);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error en el registro. Intenta nuevamente.';
        this.loading = false;
      },
    });
  }
}
