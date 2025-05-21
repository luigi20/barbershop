import { BarbershopViewModel } from '@modules/barbershop/shared/view-models/barbershop-view-model';
import { Controller, Post, Body } from '@nestjs/common';
import { BarbershopCreateService } from '../service/create_barbershop.service';
import { CreateBarbershopDto } from '../dto/create-barbershop.dto';

@Controller('barbershop')
export class BarbershopCreateController {
  constructor(
    private readonly barbershopCreateService: BarbershopCreateService,
  ) {}

  @Post()
  async create(@Body() createBarbershopDto: CreateBarbershopDto) {
    const result = await this.barbershopCreateService.execute({
      city: createBarbershopDto.city,
      name: createBarbershopDto.name,
      number: createBarbershopDto.number,
      owner_id: createBarbershopDto.owner_id,
      phone: createBarbershopDto.phone,
      street: createBarbershopDto.street,
      list_open_hours: createBarbershopDto.list_open_hours,
    });
    return BarbershopViewModel.toHttp(result);
  }
}
