import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';
import { authGuard } from '../../guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: CarListComponent, canActivate: [authGuard] },
  { path: 'new', component: CarFormComponent, canActivate: [authGuard] },
  { path: ':id', component: CarFormComponent, canActivate: [authGuard] },
  { path: ':id/edit', component: CarFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
