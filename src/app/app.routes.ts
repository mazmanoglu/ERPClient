import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { inject, Inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CustomerComponent } from './components/customers/customer.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { ProductsComponent } from './components/products/products.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RequirementsPlanningComponent } from './components/requirements-planning/requirements-planning.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'requirements-planning/:orderId',
    component: RequirementsPlanningComponent,
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
      },
      {
        path: 'warehouses',
        component: WarehousesComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'recipes',
        component: RecipesComponent,
      },
      {
        path: 'recipe-details/:id',
        component: RecipeDetailsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
];
