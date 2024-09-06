import { Users } from "@models";
import { BaseService } from "./base.service";

export class UsersService {
    DOMAIN_URL: string;

    COMPLETE_URL: string;

    constructor() {
        this.DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL_BE;
        this.COMPLETE_URL = `${this.DOMAIN_URL}/users`;
    }

    async save(newUser: Users): Promise<Users> {
        return BaseService.save(this.COMPLETE_URL, newUser);
    }

    async getAllUsers(): Promise<Users[]> {
        const users = BaseService.getAllOrById(this.COMPLETE_URL);
        const serializedUsers = (await users).map((user) => new Users({
            id: user.id,
            username: user.username,
            name: user.name,
            lastName: user.last_name,
            birthDate: user.birthDate,
            city: user.city,
        }));
        return serializedUsers;
    }

    async findById(userId: string): Promise<Users> {
        return BaseService.getAllOrById(this.COMPLETE_URL, userId)[0];
    }

    async update(user: Users): Promise<Users> {
        return BaseService.update(this.COMPLETE_URL, user, user.id);
    };

    async delete(userId: string): Promise<Users> {
        return BaseService.delete(this.COMPLETE_URL, userId);
    }
}