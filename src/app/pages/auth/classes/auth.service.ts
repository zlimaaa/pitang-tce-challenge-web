import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Auth } from './auth.model';
import { Login } from './login.model';
import { Config } from '../../../../config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiPath = new Config().apiPath("signin");

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login): Observable<Auth> {
    return this.http.post(this.apiPath, login).pipe(
      map(this.jsonDataToAuth),
      catchError(this.handleError)     
    )
  }

  hasUserLoggedin(): boolean {
    let session = localStorage.getItem('session');
    if (session) {
      let auth: Auth = JSON.parse(session);
      if (this.jwtHelper.isTokenExpired(auth.token)) {
        localStorage.removeItem('session');
        return false;
      } else
        return true;
    }
    return false;
  }

  private jsonDataToAuth(jsonData: any): Auth {
    const response: Auth = jsonData as Auth 
    localStorage.setItem('session', JSON.stringify(response));
    return response;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(()=> error);
  }

}
