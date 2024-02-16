import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    NavBarComponent,
    PageHeaderComponent,
    FormFieldErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadCrumbComponent,
    NavBarComponent,
    PageHeaderComponent,
    RouterModule,
    FormFieldErrorComponent
  ]
})
export class SharedModule { }
