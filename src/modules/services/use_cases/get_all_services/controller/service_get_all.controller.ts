import { Controller, Get } from '@nestjs/common';
import { ServiceGetAllService } from '../service/service_get_all.service';
import { ServicesViewModel } from '@modules/services/shared/view-models/services-view-model';

@Controller('service')
export class ServiceGetAllController {
  constructor(private readonly serviceGetAllService: ServiceGetAllService) {}

  @Get()
  async get() {
    const result = await this.serviceGetAllService.execute();
    return result.map((item) => ServicesViewModel.toHttp(item));
  }
}
