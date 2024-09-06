import { City } from "../cities/city.model";

export class Users {
    id: string;

    username: string;

    name: string;

    lastName: string;

    birthDate: string;

    city: City;

    constructor(data: Partial<Users> = {}) {
        Object.assign(this, data);
    }
}