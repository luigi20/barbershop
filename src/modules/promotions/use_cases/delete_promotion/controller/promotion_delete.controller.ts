import { Controller, Param, Delete } from '@nestjs/common';
import { PromotionDeleteService } from '../service/delete_promotion.service';

@Controller('promotion')
export class PromotionDeleteController {
  constructor(
    private readonly promotionDeleteService: PromotionDeleteService,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string, user_id: string) {
    await this.promotionDeleteService.execute({
      user_id: user_id,
      id: id,
    });
  }
}
