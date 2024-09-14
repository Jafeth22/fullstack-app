import { City } from "../cities/city.model";

export class Users {
    id: string;

    username: string;

    name: string;

    lastName: string;

    birthDate: string;
    
    cityId: number; // Only to update or create
    
    city: City; // To show data

    constructor(data: Partial<Users> = {}) {
        Object.assign(this, data);
    }
}