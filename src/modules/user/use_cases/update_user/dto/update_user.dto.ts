import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
