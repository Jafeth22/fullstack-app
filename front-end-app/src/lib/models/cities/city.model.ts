export class City {
    id?: string
    
    name: string;
    
    description: string;

    active: boolean;

    constructor(data: Partial<City> = {}) {
        Object.assign(this, data);
    }
}