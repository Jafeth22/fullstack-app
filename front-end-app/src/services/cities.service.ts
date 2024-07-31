import { City } from "@/lib/models";
import { BaseService } from "./base.service";

export class CityServices {
    DOMAIN_URL: string;

    COMPLETE_URL: string;

    constructor() {
        this.DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL_BE;
        this.COMPLETE_URL = `${this.DOMAIN_URL}/cities`;
    }

    async save(city: City): Promise<City> {
        const newCity = {
            name: city.name,
            description: city.description,
            active: city.active
        }
        return BaseService.save(this.COMPLETE_URL, newCity);
    }

    async getAllCities(): Promise<City[]> {
        return BaseService.getAllOrById(this.COMPLETE_URL);
    }

    async findById(cityId: string): Promise<City> {
        return BaseService.getAllOrById(this.COMPLETE_URL, cityId)[0];
    }

    async update(updatedCity: City): Promise<City> {
        // With ! we affirm this value won't be null
        return BaseService.update(this.COMPLETE_URL, updatedCity, updatedCity.id!);
    }

    async delete(cityId: string): Promise<City> {
        return BaseService.delete(this.COMPLETE_URL, cityId);
    }
}