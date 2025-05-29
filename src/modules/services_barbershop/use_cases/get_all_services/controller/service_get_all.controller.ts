import { Controller, Get } from '@nestjs/common';
import { ServicesViewModel } from '@modules/services_barbershop/shared/view-models/services-view-model';
import { ServiceGetAllService } from '../service/service_get_all.service';

@Controller('service')
export class ServiceGetAllController {
  constructor(private readonly serviceGetAllService: ServiceGetAllService) {}

  @Get()
  async get() {
    const result = await this.serviceGetAllService.execute();
    return result.map((item) => ServicesViewModel.toHttp(item));
  }
}
