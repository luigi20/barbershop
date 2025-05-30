import { Controller, Body, Param, Put } from '@nestjs/common';
import { BarbershopServicesViewModel } from '@modules/barbershop_services/shared/view-models/barbershop_services-view-model';
import { UpdateBarbershopServiceDto } from '../dto/update-barbershop_service.dto';
import { BarbershopServiceUpdateService } from '../service/update_barbershop_service.service';

@Controller('barbershopservice')
export class BarbershopServiceUpdateController {
  constructor(
    private readonly barbershopServiceUpdateService: BarbershopServiceUpdateService,
  ) {}

  @Put(':barbershop_id/:service_id')
  async update(
    @Body() updateBarbershopServiceDto: UpdateBarbershopServiceDto,
    @Param('barbershop_id') barbershop_id: string,
    @Param('service_id') service_id: string,
  ) {
    const result = await this.barbershopServiceUpdateService.execute({
      barbershop_id: barbershop_id,
      service_id: service_id,
      user_id: updateBarbershopServiceDto.user_id,
      duration: updateBarbershopServiceDto.duration,
      price: updateBarbershopServiceDto.price,
    });
    return BarbershopServicesViewModel.toHttp(result);
  }
}
