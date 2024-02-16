import { AfterContentChecked, Component, OnInit } from '@angular/core';

import { UserService } from '../classes/user.service';
import { User } from '../classes/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit, AfterContentChecked {
  
  user:User = new User();

  constructor(private userService: UserService) { }  

  ngOnInit(): void { this.getUserInfo() }
  ngAfterContentChecked(): void {}

  getUserInfo() {
    this.userService.getUserInfo().subscribe({
      next: (user) => (this.user = user),
      error: (error) => toastr.error(error.error.message)
    });
  }

}
