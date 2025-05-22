import { CreateOpenHoursDTO } from '@modules/open_hours/shared/dto/createOpenHoursDTO';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateBarbershopDto {
  @IsString()
  name: string;

  @IsEmail()
  owner_id: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  city: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsArray()
  list_open_hours: CreateOpenHoursDTO[];
}
