import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '../../shared/models/api/user.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiURL;
  private readonly http = inject(HttpClient);

  setUserId(id: string, userName: string): void {
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('userName', userName);
  }

  getUserId(): string {
    return sessionStorage.getItem('userId') || '';
  }
  getUserName(): string {
    return sessionStorage.getItem('userName') || '';
  }

  getProfile() {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`).pipe(
      tap(profile => {
        this.setUserId(profile._id, profile.username);
      })
    );
  }
  clearUser(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
  }
}
