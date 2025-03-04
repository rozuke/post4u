import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { PostService } from '../../core/services/post.service';
import { PostResponse } from '../../shared/models/api/post.model';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-feed',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    PostCardComponent,
    InitialsPipe,
    TimeAgoPipe,
    MatGridListModule,
    NgIf,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit, OnDestroy {
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  private readonly postService = inject(PostService);

  public data: PostResponse[] = [];

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.data = posts.reverse();
    });
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
