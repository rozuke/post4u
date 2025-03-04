import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
