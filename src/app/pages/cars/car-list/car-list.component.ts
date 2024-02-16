import { Component } from '@angular/core';
import { Car } from '../classes/car.model';
import { GenericListComponent } from '../../../shared/components/generic-list.component';
import { CarService } from '../classes/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent extends GenericListComponent<Car> {

  constructor(private carService: CarService) {
    super("Carro", carService);
  }

}
