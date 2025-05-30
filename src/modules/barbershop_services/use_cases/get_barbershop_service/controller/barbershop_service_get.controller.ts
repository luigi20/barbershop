import { Controller, Get, Param } from '@nestjs/common';
import { BarbershopServiceGetService } from '../service/get_barbershop_service.service';
import { BarbershopServicesViewModel } from '@modules/barbershop_services/shared/view-models/barbershop_services-view-model';

@Controller('barbershopservice')
export class BarbershopServiceGetController {
  constructor(
    private readonly barbershopServiceGetService: BarbershopServiceGetService,
  ) {}

  @Get(':barbershop_id')
  async get(@Param('barbershop_id') barbershop_id: string, user_id: string) {
    const result = await this.barbershopServiceGetService.execute({
      barbershop_id: barbershop_id,
      user_id: user_id,
    });
    return result.map((item) => BarbershopServicesViewModel.toHttp(item));
  }
}
