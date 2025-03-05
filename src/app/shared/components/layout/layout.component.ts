import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, TitleCasePipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { filter } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from '../../../core/services/theme.service';
@Component({
  selector: 'app-layout',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    NgIf,
    RouterOutlet,
    MatDividerModule,
    RouterModule,
    MatMenuModule,
    MatCardModule,
    TitleCasePipe,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnDestroy, OnInit {
  protected readonly isMobile = signal(true);
  protected themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  public showActionsContainer = true;

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  public userId = '';

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showActionsContainer = event.urlAfterRedirects === '/';
      });
    this.userId = this.userService.getUserId();
  }

  redirectHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
