import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsOptional()
  user_id?: number;
}
