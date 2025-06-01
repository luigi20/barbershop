import { IsNumber, IsUUID } from 'class-validator';

export class CreateBarbershopServiceDto {
  @IsUUID()
  barbershop_id: string;

  @IsUUID()
  service_id: string;

  @IsUUID()
  user_id: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;
}
