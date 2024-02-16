import { GenericModel } from "../../../shared/models/generic.model";
import { Car } from "../../cars/classes/car.model";

export class User extends GenericModel {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public birthDate?: string,
        public email?: string,
        public login?: string,
        public password?: string,
        public phone?: string,
        public createdAt?: string,
        public lastLogin?: string,
        public cars?: Car[]
    ){
        super();
    }

    static fromJson(jsonData: any): User {
        return Object.assign(new User(), jsonData);
    }

}