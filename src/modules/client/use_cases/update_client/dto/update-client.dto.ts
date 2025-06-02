import {
  IsEmail,
  IsIn,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

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
  @IsIn(['ATIVO', 'INATIVO'])
  status: 'ATIVO' | 'INATIVO';

  @IsUUID()
  barbershop_id: string;
}
