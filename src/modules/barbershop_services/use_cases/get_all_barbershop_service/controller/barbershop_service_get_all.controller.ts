import { Controller, Get, Param } from '@nestjs/common';
import { BarbershopServicesViewModel } from '@modules/barbershop_services/shared/view-models/barbershop_services-view-model';
import { BarbershopServiceGetAllService } from '../service/get_all_barbershop_service.service';

@Controller('barbershopservice')
export class BarbershopServiceGetAllController {
  constructor(
    private readonly barbershopServiceGetAllService: BarbershopServiceGetAllService,
  ) {}

  @Get('all/:barbershop_id')
  async get(@Param('barbershop_id') barbershop_id: string, user_id: string) {
    const result = await this.barbershopServiceGetAllService.execute({
      barbershop_id: barbershop_id,
      user_id: user_id,
    });
    return result.map((item) => BarbershopServicesViewModel.toHttp(item));
  }
}
