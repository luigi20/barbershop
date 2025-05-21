import { BarbershopViewModel } from '@modules/barbershop/shared/view-models/barbershop-view-model';
import { Controller, Body, Param, Put } from '@nestjs/common';
import { UpdateBarbershopDto } from '../dto/update-barbershop.dto';
import { BarbershopUpdateService } from '../service/update_barbershop.service';

@Controller('barbershop')
export class BarbershopUpdateController {
  constructor(
    private readonly barbershopUpdateService: BarbershopUpdateService,
  ) {}

  @Put(':id')
  async create(
    @Body() updateBarbershopDto: UpdateBarbershopDto,
    @Param('id') id: string,
  ) {
    const result = await this.barbershopUpdateService.execute({
      city: updateBarbershopDto.city,
      name: updateBarbershopDto.name,
      number: updateBarbershopDto.number,
      id: id,
      user_id: '123456',
      phone: updateBarbershopDto.phone,
      street: updateBarbershopDto.street,
    });
    return BarbershopViewModel.toHttp(result);
  }
}
