import {
  IsEmail,
  IsIn,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

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
  @IsIn(['ATIVO', 'INATIVO'])
  status: 'ATIVO' | 'INATIVO';

  @IsString()
  @IsIn(['ADMIN', 'BARBER', 'CLIENT'])
  role: 'ADMIN' | 'BARBER' | 'CLIENT';
}
