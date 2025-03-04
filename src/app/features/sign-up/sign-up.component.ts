import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthService } from '../../core/services/auth.service';
import { passwordStrengthValidator } from '../../shared/validators/strong-password-validator';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    NgIf,
    MatInputModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
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
