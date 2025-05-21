import { Controller, Get } from '@nestjs/common';
import { BarbershopGetService } from '../service/get_barbershop.service';
import { BarbershopViewModel } from '@modules/barbershop/shared/view-models/barbershop-view-model';

@Controller('barbershop')
export class BarbershopGetController {
  constructor(private readonly barbershopGetService: BarbershopGetService) {}

  @Get()
  async get(id: string) {
    const result = await this.barbershopGetService.execute(id);
    return result.map((item) => BarbershopViewModel.toHttp(item));
  }
}
