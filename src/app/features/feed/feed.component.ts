import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { PostService } from '../../core/services/post.service';
import { PostResponse } from '../../shared/models/api/post.model';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
@Component({
  selector: 'app-feed',
  imports: [PostCardComponent, InitialsPipe, TimeAgoPipe],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  private readonly postService = inject(PostService);

  public data: PostResponse[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.data = posts.reverse();
    });
  }
}
