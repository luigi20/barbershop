import { IsEmail, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  role: 'CLIENT';

  @IsUUID()
  barbershop_id: string;
}
