import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { LoginResponse } from '../../shared/models/login.response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = `${environment.apiURL}/auth`;
  private http = inject(HttpClient);

  private get storedToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return this.storedToken;
  }

  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  register(email: string, password: string) {
    return this.http
      .post(`${this.API_URL}/signup`, { username: email, password })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Email is already taken'));
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, {
        username: email,
        password,
      })
      .pipe(
        map(response => {
          this.setToken(response.access_token);
          return response;
        }),
        catchError(error => {
          return throwError(() => new Error('Email or password is incorrect'));
        })
      );
  }
}
