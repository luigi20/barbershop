import { Controller, Param, Delete } from '@nestjs/common';
import { BarbershopServiceDeleteService } from '../service/delete_barbershop_service.service';

@Controller('barbershopservice')
export class BarbershopServiceDeleteController {
  constructor(
    private readonly barbershopServiceDeleteService: BarbershopServiceDeleteService,
  ) {}

  @Delete(':barbershop_id/:service_id')
  async delete(
    @Param('service_id') service_id: string,
    @Param('barbershop_id') barbershop_id: string,
    user_id: string,
  ) {
    await this.barbershopServiceDeleteService.execute({
      service_id: service_id,
      barbershop_id: barbershop_id,
      user_id: user_id,
    });
  }
}
