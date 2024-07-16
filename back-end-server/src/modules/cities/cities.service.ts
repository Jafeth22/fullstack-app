import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto) {
    const newCity = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(newCity);
  }

  async findAll() {
    return await this.citiesRepository.find();
  }

  async findOne(id: number) {
    return await this.citiesRepository.find({ where: { id } });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException(`La ciudad con el ${id} no se encontró`);
    }

    // Merge the updated properties into the existing city object
    Object.assign(city[0], updateCityDto);

    return await this.citiesRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException(`La ciudad con el ${id} no se encontró`);
    }
    return await this.citiesRepository.remove(city);
  }
}
