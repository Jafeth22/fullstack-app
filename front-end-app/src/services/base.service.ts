export class BaseService {
    static async save(baseUrl: string, values: any): Promise<any> {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            return response;
        } catch (error) {
            console.log(['error-save:', error]);
            return undefined;
        }
    }

    static async getAllOrById(baseUrl: string, id?: string): Promise<any[]> {
        const url = id ? `${baseUrl}/${id}` : baseUrl;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.log(['error-get:', error]);
            return [];
        }
    }

    static async update(baseUrl: string, values: any, id: string): Promise<any> {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            return response;
        } catch (error) {
            console.log(['error-update:', error]);
            return undefined;
        }
    }

    static async delete(baseUrl: string, id: string): Promise<any> {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.log(['error-delete:', error]);
            return undefined;
        }
    }
}