import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../../core/services/user.service';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { PostService } from '../../core/services/post.service';
import { PostResponseDTO } from '../../shared/models/api/post.model';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
@Component({
  selector: 'app-user-profile',
  imports: [
    MatCardModule,
    InitialsPipe,
    MatTabsModule,
    PostCardComponent,
    TimeAgoPipe,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private readonly userSerive = inject(UserService);
  private readonly postService = inject(PostService);
  private userId = '';
  public posts: PostResponseDTO[] = [];

  public userName = '';
  ngOnInit(): void {
    this.userSerive.getProfile().subscribe(() => {
      this.userName = this.userSerive.getUserName();
      this.userId = this.userSerive.getUserId();
      this.postService.getPostByUserId(this.userId).subscribe(posts => {
        this.posts = posts.reverse();
      });
    });
  }
}
