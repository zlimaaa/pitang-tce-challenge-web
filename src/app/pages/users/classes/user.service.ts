import { Injectable, Injector } from '@angular/core';

import { User } from './user.model';
import { GenericService } from '../../../shared/services/generic.service';
import { Config } from '../../../../config';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService<User> {

  userInfoPath = new Config().apiPath("me")

  constructor(injector: Injector) {
    super("users", injector)
  }

  getUserInfo(): Observable<User> {
    return this.http.get(this.userInfoPath).pipe(
      map(this.jsonDataToModel), catchError(this.handleError)
    );
  }

}
