import { Component } from '@angular/core';

import { GenericListComponent } from '../../../shared/components/generic-list.component';
import { UserService } from '../classes/user.service';
import { User } from '../classes/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent extends GenericListComponent<User> {

  constructor(private userService: UserService) {
    super("Usuário", userService)
  }

}
