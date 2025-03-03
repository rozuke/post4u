import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = `${environment.apiURL}/auth`;
  private http = inject(HttpClient);
  isAuthenticated = signal(false);

  private get storedToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return this.storedToken;
  }

  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.isAuthenticated.set(true);
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
  }

  register(email: string, password: string) {
    return this.http
      .post(`${this.API_URL}/signup`, { username: email, password })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Registration failed'));
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email, password }).pipe(
      catchError(error => {
        return throwError(() => new Error('Login failed'));
      })
    );
  }
}
