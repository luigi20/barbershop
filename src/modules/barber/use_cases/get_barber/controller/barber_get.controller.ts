import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get, Param } from '@nestjs/common';
import { BarberGetService } from '../service/barber_get.service';

@Controller('barber')
export class BarberGetController {
  constructor(private readonly barberGetService: BarberGetService) {}

  @Get(':id')
  async get(@Param() id: string) {
    const result = await this.barberGetService.execute(id);
    return UserViewModel.toHttp(result);
  }
}
