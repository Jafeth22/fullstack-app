import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Type(() => Date) // Change to Date object
  @IsDate() // Valid is Date
  birth_date: Date;

  @IsNotEmpty()
  @IsNumber()
  city_id: number;
}
