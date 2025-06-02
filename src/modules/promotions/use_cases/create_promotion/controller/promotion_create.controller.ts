import { Controller, Post, Body } from '@nestjs/common';
import { PromotionViewModel } from '@modules/promotions/shared/view-models/promotion-view-model';
import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { PromotionCreateService } from '../service/create_promotion.service';

@Controller('promotion')
export class PromotionCreateController {
  constructor(
    private readonly promotionCreateService: PromotionCreateService,
  ) {}

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    const result = await this.promotionCreateService.execute({
      barbershop_id: createPromotionDto.barbershop_id,
      service_id: createPromotionDto.service_id,
      user_id: createPromotionDto.user_id,
      status: createPromotionDto.status,
      discount_amount: createPromotionDto.discount_amount,
    });
    return PromotionViewModel.toHttp(result);
  }
}
