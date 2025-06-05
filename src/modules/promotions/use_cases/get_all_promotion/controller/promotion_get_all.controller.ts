import { Controller, Get } from '@nestjs/common';
import { PromotionViewModel } from '@modules/promotions/shared/view-models/promotion-view-model';
import { PromotionGetAllService } from '../service/get_all_promotion.service';

@Controller('promotion')
export class PromotionGetAllController {
  constructor(
    private readonly promotionGetAllService: PromotionGetAllService,
  ) {}

  @Get('/list')
  async get(user_id: string) {
    const result = await this.promotionGetAllService.execute({
      user_id: user_id,
    });
    return result.map((item) => PromotionViewModel.toHttp(item));
  }
}
