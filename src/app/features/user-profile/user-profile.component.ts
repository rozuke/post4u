import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../../core/services/user.service';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
@Component({
  selector: 'app-user-profile',
  imports: [MatCardModule, InitialsPipe, MatTabsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private readonly userSerive = inject(UserService);

  public userName = '';
  ngOnInit(): void {
    this.userSerive.getProfile().subscribe(() => {
      this.userName = this.userSerive.getUserName();
    });
  }
}
