import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../pages/auth/classes/auth.service';
import { Router } from '@angular/router';
import toastr from 'toastr';
import { Auth } from '../../../pages/auth/classes/auth.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  hasUserLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.verifyIfHasUserLoggedIn();
    this.getNameUserLoggedIn();
  }

  logout() {
    localStorage.removeItem('session');
    toastr.success("Usuário deslogado com sucesso!");
    this.verifyIfHasUserLoggedIn();
    this.router.navigate(['users']);
  }

  private verifyIfHasUserLoggedIn() {
    this.hasUserLoggedIn = this.authService.hasUserLoggedin();

  }

  private getNameUserLoggedIn() {
    const session = localStorage.getItem('session');
    if(session){
      const auth: Auth = JSON.parse(session);
      this.userName = this.capitalizeName(auth.name);
    }      
  }

  private capitalizeName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
 

}
