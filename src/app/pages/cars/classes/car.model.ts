import { GenericModel } from "../../../shared/models/generic.model";

export class Car extends GenericModel {
    constructor(
        public model?: string,
        public color?: string,
        public licensePlate?: string,
        public year?: number
    ){
        super();
    }

    static fromJson(jsonData: any): Car {
        return Object.assign(new Car(), jsonData);
    }
    
}