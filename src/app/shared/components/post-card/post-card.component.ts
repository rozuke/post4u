import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
@Component({
  selector: 'app-post-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);
  @Input() avatar: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() content: string = '';
  @Input() commentsCount: number = 0;
  @Input() showBulletOptions: boolean = false;
  @Input() postId: string = '';

  onCardClick() {
    this.router.navigate(['/test1']);
  }

  deletePostHandler() {
    this.postService.deletePost(this.postId).subscribe(() => {
      window.location.reload();
    });
  }

  editPostHandler() {
    this.router.navigate(['/edit-post', this.postId]);
  }
}
