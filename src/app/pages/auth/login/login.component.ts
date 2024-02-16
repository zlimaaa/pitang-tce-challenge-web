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
      error: this.handleError.bind(this),
    });
  }

  private handleError(error: any) {

    if(error.statusText == 'Unknown Error') {
        toastr.error("Falha ao conectar com o servidor")
    }else if(error.status == '500'){
        toastr.error("Falha interna do servidor")
    }else if(error.status == '403' || error.status == '401') {
      toastr.error("Unauthorized")
    }else {
      toastr.error(error.error.message)
    }
      
  }

  private checkAndRedirectIfHasUserLoggedIn() {
    if (this.authService.hasUserLoggedin()) 
      this.router.navigate(['users']);
    else this.router.navigate(['login']);
  }
}
