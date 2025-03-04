import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';
import { FeedComponent } from './features/feed/feed.component';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CreatePostComponent } from './features/create-post/create-post.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: FeedComponent, canActivate: [authGuard] },
      {
        path: 'new-post',
        component: CreatePostComponent,
        canActivate: [authGuard],
      },
      {
        path: 'user/:userId',
        component: UserProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];
