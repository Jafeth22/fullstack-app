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
  lastName: string;

  @Type(() => Date) // Change to Date object
  @IsDate() // Valid is Date
  birthDate: Date;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;
}
