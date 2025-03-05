import { Component, HostListener, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { PostService } from '../../core/services/post.service';
import { PostDTO, PostResponseDTO } from '../../shared/models/api/post.model';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-feed',
  imports: [
    PostCardComponent,
    InitialsPipe,
    TimeAgoPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly snackBar = inject(MatSnackBar);

  public allPosts: PostResponseDTO[] = [];
  public displayedPosts: PostResponseDTO[] = [];
  public loading = false;
  public hasMore = true;

  private currentIndex = 0;
  private pageSize = 10;

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.loading = true;
    this.postService.getPostsWithCommentCounts().subscribe({
      next: posts => {
        this.allPosts = posts.reverse();
        this.loadMorePosts();
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('document:mousewheel', ['$event'])
  onScrollOrMousewheel(): void {
    const threshold = 100;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.offsetHeight;

    if (position > height - threshold && this.hasMore && !this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loadMorePosts();
      }, 4000);
    }
  }

  private loadMorePosts(): void {
    if (this.currentIndex >= this.allPosts.length) {
      this.hasMore = false;
      this.showNoMorePostsMessage();
      return;
    }

    const nextPosts = this.allPosts.slice(
      this.currentIndex,
      this.currentIndex + this.pageSize
    );

    this.displayedPosts = [...this.displayedPosts, ...nextPosts];
    this.currentIndex += this.pageSize;
    if (this.currentIndex >= this.allPosts.length) {
      this.hasMore = false;
      this.showNoMorePostsMessage();
    }

    this.loading = false;
  }

  private showNoMorePostsMessage(): void {
    this.snackBar.open(
      'There are not more posts to show, reload the page',
      'Cerrar',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }
}
