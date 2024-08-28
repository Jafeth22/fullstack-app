import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  active: boolean;

  @IsOptional()
  user_id?: number;
}
