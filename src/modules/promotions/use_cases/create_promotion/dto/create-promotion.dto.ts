import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePromotionDto {
  @IsUUID()
  user_id: string;

  @IsString()
  status: string;

  @IsNumber()
  discount_amount: number;

  @IsUUID()
  barbershop_id: string;

  @IsUUID()
  service_id: string;
}
