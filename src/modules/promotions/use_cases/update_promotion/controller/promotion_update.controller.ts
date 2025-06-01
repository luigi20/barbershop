import { Controller, Body, Param, Put } from '@nestjs/common';
import { UpdatePromotionDto } from '../dto/update-promotion.dto';
import { PromotionUpdateService } from '../service/update_promotion.service';
import { PromotionViewModel } from '@modules/promotions/shared/view-models/promotion-view-model';

@Controller('promotion')
export class PromotionUpdateController {
  constructor(
    private readonly promotionUpdateService: PromotionUpdateService,
  ) {}

  @Put(':id')
  async update(
    @Body() updatePromotionDto: UpdatePromotionDto,
    @Param('id') id: string,
  ) {
    const result = await this.promotionUpdateService.execute({
      barbershop_id: updatePromotionDto.barbershop_id,
      service_id: updatePromotionDto.service_id,
      user_id: updatePromotionDto.user_id,
      status: updatePromotionDto.status,
      discount_amount: updatePromotionDto.discount_amount,
      id: id,
    });
    return PromotionViewModel.toHttp(result);
  }
}
