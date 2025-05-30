import { IsNumber, IsUUID } from 'class-validator';

export class UpdateBarbershopServiceDto {
  @IsUUID()
  user_id: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;
}
