import { IsEmail, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: 'ADMIN' | 'BARBER' | 'CLIENT';
}
