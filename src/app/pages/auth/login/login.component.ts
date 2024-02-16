import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import toastr from 'toastr';

import { Login } from '../classes/login.model';
import { AuthService } from '../classes/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.checkAndRedirectIfHasUserLoggedIn();
  }

  get field() {
    return this.form.controls;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const login: Login = {
      login: this.form.get('login')?.value,
      password: this.form.get('password')?.value,
    };

    this.authService.login(login).subscribe({
      next: () => this.router.navigate(['users']),
      error: (error) => toastr.error(error.error.message),
    });
  }

  private checkAndRedirectIfHasUserLoggedIn() {
    if (this.authService.hasUserLoggedin()) 
      this.router.navigate(['users']);
    else this.router.navigate(['login']);
  }
}
