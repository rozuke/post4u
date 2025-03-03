import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = `${environment.apiURL} /auth`;

  constructor(private http: HttpClient) {}
  
  register(email: string, password: string) {
    return this.http
      .post<{ jwt: string }>(`${this.API_URL}/signup`, { email, password })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Registration failed'));
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<{ jwt: string }>(`${this.API_URL}/login`, { email, password })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Login failed'));
        })
      );
  }
}
