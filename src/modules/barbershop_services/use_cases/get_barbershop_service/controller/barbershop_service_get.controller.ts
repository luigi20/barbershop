import { Controller, Get, Param } from '@nestjs/common';
import { BarbershopServicesViewModel } from '@modules/barbershop_services/shared/view-models/barbershop_services-view-model';
import { BarbershopServiceGetService } from '../service/get_barbershop_service.service';

@Controller('barbershopservice')
export class BarbershopServiceGetController {
  constructor(
    private readonly barbershopServiceGetService: BarbershopServiceGetService,
  ) {}

  @Get(':barbershop_id/:service_id')
  async get(
    @Param('barbershop_id') barbershop_id: string,
    user_id: string,
    @Param('service_id') service_id: string,
  ) {
    const result = await this.barbershopServiceGetService.execute({
      barbershop_id: barbershop_id,
      user_id: user_id,
      service_id: service_id,
    });
    return BarbershopServicesViewModel.toHttp(result);
  }
}
