import { Controller, Get, Param } from '@nestjs/common';
import { PromotionViewModel } from '@modules/promotions/shared/view-models/promotion-view-model';
import { PromotionGetService } from '../service/get_promotion.service';

@Controller('promotion')
export class PromotionGetController {
  constructor(private readonly promotionGetService: PromotionGetService) {}

  @Get('/get/:id')
  async get(@Param('id') id: string, user_id: string) {
    const result = await this.promotionGetService.execute({
      promotion_id: id,
      user_id: user_id,
    });
    return PromotionViewModel.toHttp(result);
  }
}
