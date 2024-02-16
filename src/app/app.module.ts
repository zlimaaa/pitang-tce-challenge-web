import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { LoginComponent } from './pages/auth/login/login.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { CarFormComponent } from './pages/cars/car-form/car-form.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { SharedModule } from './shared/shared.module';
import { loggerInterceptor } from './interceptors/logger.interceptor';
import { UserInfoComponent } from './pages/users/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent,
    UserListComponent,
    CarFormComponent,
    CarListComponent,
    UserInfoComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    IMaskModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TableModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideNgxMask(),
    provideHttpClient(withInterceptors([loggerInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
