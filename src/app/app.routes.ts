import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'roles', loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent) },
  { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'users/edit/:id', loadComponent: () => import('./users/components/edit-user-page/edit-user-page.component').then(m => m.EditUserPageComponent) },
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
];
