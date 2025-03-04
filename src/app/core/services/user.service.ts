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
  private userId = '';

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  getProfile() {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`).pipe(
      tap(profile => {
        this.setUserId(profile._id);
      })
    );
  }
}
