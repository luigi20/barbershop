import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get, Param } from '@nestjs/common';
import { BarberGetAllService } from '../service/barber_getall.service';

@Controller('barber')
export class BarberGetAllController {
  constructor(private readonly barberGetAllService: BarberGetAllService) {}

  @Get(':barbershop_id')
  async get(@Param('id') barbershop_id: string) {
    const result = await this.barberGetAllService.execute(barbershop_id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(UserViewModel.toHttp);
  }
}
