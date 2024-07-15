import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { inject, Inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CustomerComponent } from './components/customers/customer.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutsComponent,
    canActivateChild: [() => inject(AuthService).isAuthenticated()],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'customers',
        component: CustomerComponent,
      }
    ],
  },
];
