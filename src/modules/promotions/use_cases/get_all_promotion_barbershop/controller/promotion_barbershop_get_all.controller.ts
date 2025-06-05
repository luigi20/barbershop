import { Controller, Get, Param } from '@nestjs/common';
import { PromotionViewModel } from '@modules/promotions/shared/view-models/promotion-view-model';
import { PromotionBarbershopGetAllService } from '../service/get_all_promotion_barbershop.service';

@Controller('promotion')
export class PromotionBarbershopGetAllController {
  constructor(
    private readonly promotionBarbershopGetAllService: PromotionBarbershopGetAllService,
  ) {}

  @Get('/getall/:barbershop_id')
  async get(@Param('barbershop_id') barbershop_id: string, user_id: string) {
    const result = await this.promotionBarbershopGetAllService.execute({
      barbershop_id: barbershop_id,
      user_id: user_id,
    });
    return result.map((item) => PromotionViewModel.toHttp(item));
  }
}
