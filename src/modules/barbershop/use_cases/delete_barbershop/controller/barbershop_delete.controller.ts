import { Controller, Param, Delete } from '@nestjs/common';
import { BarbershopDeleteService } from '../service/delete_barbershop.service';

@Controller('barbershop')
export class BarbershopDeleteController {
  constructor(
    private readonly barbershopDeleteService: BarbershopDeleteService,
  ) {}

  @Delete(':id')
  async delete(user_id: string, @Param() id: string) {
    await this.barbershopDeleteService.execute(user_id, id);
  }
}
