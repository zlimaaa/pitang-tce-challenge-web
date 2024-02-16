import { Component, Injector } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

import { GenericFormComponent } from '../../../shared/components/generic-form.component';
import { UserService } from '../classes/user.service';
import { User } from '../classes/user.model';
import { MustMatch } from '../../../utils/must-match.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent extends GenericFormComponent<User> {
  
  constructor(injector: Injector, protected userService: UserService) {
    super(injector, new User(), 'Usuário', userService, User.fromJson);
  }

  protected override buildForm(): void {
    this.form = this.formBuilder.group({
        id: [null],
        firstName: [null, [Validators.required, Validators.minLength(2)]],
        lastName: [null, [Validators.required, Validators.minLength(2)]],
        birthDate: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, Validators.required],
        login: [null, Validators.required],
        password: [null, this.customFieldValidate.bind(this)],
        confirmPassword: [null, this.customFieldValidate.bind(this)],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  customFieldValidate(control: AbstractControl) {
    const value = control.value;

    if (this.currentAction == 'new') {
      if (!value) return { required: true };
      else if (value.trim().length < 6) return { passwordMinLength: true };
    } else {      
      if (value && value.trim().length < 6) return { passwordMinLength: true };
      if (!value)        
        this.form.reset      
    }
    return null;
  }

}
