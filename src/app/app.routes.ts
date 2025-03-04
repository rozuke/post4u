import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';
import { FeedComponent } from './features/feed/feed.component';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: FeedComponent, canActivate: [authGuard] },
    ],
  },
  { path: '**', redirectTo: '/' },
];
