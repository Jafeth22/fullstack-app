import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { City } from '@entities/cities/entities/city.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { birthDate, cityId, lastName, name, username } = createUserDto;
    const getCity = await this.cityRepository.findOne({
      where: { id: cityId },
    });

    if (!getCity) {
      throw new NotFoundException(
        `The city with the ID: ${cityId} was not found`,
      );
    }

    const newUser = this.userRepository.create({
      username,
      name,
      birth_date: birthDate,
      city: getCity,
      last_name: lastName,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    const getUsers = await this.userRepository.find({
      relations: ['city'], // This will let me see the information of the relation
      order: { ['username']: 'ASC' },
    });
    return getUsers.map(
      ({ id, name, username, birth_date, city, last_name }) => ({
        id,
        name,
        username,
        birthDate: birth_date,
        city,
        lastName: last_name,
      }),
    );
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['city'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.findOne(id);

    if (!foundUser) {
      throw new NotFoundException(`The user with the ID: ${id} was not found`);
    }
    const { username, name, lastName, birthDate, cityId } = updateUserDto;

    const city = await this.cityRepository.findOne({
      where: { id: cityId },
    });

    if (!city) {
      throw new NotFoundException(
        `The city with the ID: ${city} was not found-`,
      );
    }

    return await this.userRepository.save({
      id,
      username,
      name,
      last_name: lastName,
      birth_date: birthDate,
      city,
    });
  }

  async remove(id: number) {
    const foundUser = await this.findOne(id);
    if (!foundUser) {
      throw new NotFoundException(`The user with the ID: ${id} was not found`);
    }

    return this.userRepository.remove(foundUser);
  }
}
