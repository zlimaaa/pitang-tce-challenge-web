import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.guard';
import { UserInfoComponent } from './pages/users/user-info/user-info.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((mod) => mod.UsersModule),
  },
  {
    path: 'user/info',
    component: UserInfoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cars',
    loadChildren: () =>
      import('./pages/cars/cars.module').then((mod) => mod.CarsModule),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
