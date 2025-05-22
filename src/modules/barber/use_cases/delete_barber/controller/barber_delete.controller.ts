import { Controller, Param, Delete } from '@nestjs/common';
import { BarberDeleteService } from '../service/barber_delete.service';

@Controller('barber')
export class BarberDeleteController {
  constructor(private readonly barberDeleteService: BarberDeleteService) {}

  @Delete(':id')
  async delete(@Param() id: string) {
    await this.barberDeleteService.execute(id);
  }
}
