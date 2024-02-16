import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrl: './form-field-error.component.css',
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: AbstractControl<any> | null = null;

  constructor() {}

  ngOnInit() {}

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage())
      return this.getErrorMessage();
    return null;
  }

  private mustShowErrorMessage(): boolean {
    if (this.formControl != null)
      return this.formControl.invalid && this.formControl.touched;

    return false;
  }

  private getErrorMessage(): string | null {
    if (this.formControl?.errors?.['required']) {
      return 'Campo obrigatório';
    } else if (this.formControl?.errors?.['minlength']) {
      const requiredLength =
        this.formControl.errors?.['minlength'].requiredLength;
      return `O campo deve ter pelo menos ${requiredLength} caracteres`;
    } else if (this.formControl?.errors?.['maxlength']) {
      const requiredLength =
        this.formControl.errors?.['maxlength'].requiredLength;
      return `O campo deve ter no maxímo ${requiredLength} caracteres`;
    } else if (this.formControl?.errors?.['email']) {
      return 'Formato de email inválido';
    } else if(this.formControl?.errors?.['mustMatch']) {
      return 'O campo senha e confirmação senha devem ser iguais';
    } else if(this.formControl?.errors?.['passwordMinLength']) {
      return 'O campo deve ter pelo menos 6 caracteres';
    }
    
    return null;
  }
}
