import { Injectable, Injector } from '@angular/core';
import { GenericService } from '../../../shared/services/generic.service';
import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService extends GenericService<Car>{

  constructor(injector: Injector) {
    super("cars", injector)
  }
}
