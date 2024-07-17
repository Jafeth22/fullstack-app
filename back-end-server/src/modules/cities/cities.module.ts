import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CitiesController], // THis is necessary if the module will expose any endpoint
  providers: [CitiesService], // Necessary if the business logic is encapsulated on some service
  // exports: [CitiesService],
})
export class CitiesModule {}
