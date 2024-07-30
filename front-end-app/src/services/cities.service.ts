import { City } from "@/lib/models";

export class CityServices {
    DOMAIN_URL: string;

    complete_url: string;

    constructor() {
        this.DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL_BE || '';
        this.complete_url = `${this.DOMAIN_URL}/cities`;
    }

    async save(city: City): Promise<City | undefined> {
        try {
            const response = await fetch(this.complete_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: city.name,
                    description: city.description,
                    active: city.active
                }),
            });
            return await response.json();
        } catch (error) {
            console.log(['---error:', error]);
            return undefined;
        }
    }

    async getAllCities(): Promise<City[]> {
        console.log(['URL', this.complete_url]);
        try {
            const response = await fetch(this.complete_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.log(['---error:', error]);
            return [];
        }
    }
}