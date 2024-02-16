import { Component, Injector } from '@angular/core';
import { Car } from '../classes/car.model';
import { GenericFormComponent } from '../../../shared/components/generic-form.component';
import { CarService } from '../classes/car.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent extends GenericFormComponent<Car> {


  constructor(injector: Injector, protected carService: CarService) {
    super(injector, new Car(), "Carro", carService, Car.fromJson);
  }

  protected override buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      model: [null, Validators.required],
      year: [null, Validators.required],
      color: [null, Validators.required],
      licensePlate: [null, Validators.required]
    });
  }

}
