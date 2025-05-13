import { IsEmail, IsString } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
