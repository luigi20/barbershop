import { IsEmail, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsUUID()
  barbershop_id: string;
}
