import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';
import { FeedComponent } from './features/feed/feed.component';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CreateUpdatePostComponent } from './features/create-update-post/create-post.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { CommentPostComponent } from './features/comment-post/comment-post.component';

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
        component: CreateUpdatePostComponent,
        canActivate: [authGuard],
      },
      {
        path: 'edit-post/:postId',
        component: CreateUpdatePostComponent,
        canActivate: [authGuard],
      },
      {
        path: 'user/:userId',
        component: UserProfileComponent,
        canActivate: [authGuard],
      },
      {
        path: 'post/:postId',
        component: CommentPostComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];
