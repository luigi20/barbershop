import { Controller, Get, Param } from '@nestjs/common';
import { PromotionGetAllService } from '../service/get_all_promotion.service';
import { PromotionViewModel } from '@modules/promotions/shared/view-models/promotion-view-model';

@Controller('promotion')
export class PromotionGetAllController {
  constructor(
    private readonly promotionGetAllService: PromotionGetAllService,
  ) {}

  @Get(':barbershop_id')
  async get(@Param('barbershop_id') barbershop_id: string, user_id: string) {
    const result = await this.promotionGetAllService.execute({
      barbershop_id: barbershop_id,
      user_id: user_id,
    });
    return result.map((item) => PromotionViewModel.toHttp(item));
  }
}
