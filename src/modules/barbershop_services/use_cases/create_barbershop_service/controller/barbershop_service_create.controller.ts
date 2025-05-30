import { Controller, Post, Body } from '@nestjs/common';
import { CreateBarbershopServiceDto } from '../dto/create-barbershop_service.dto';
import { BarbershopServiceCreateService } from '../service/create_barbershop_service.service';
import { BarbershopServicesViewModel } from '@modules/barbershop_services/shared/view-models/barbershop_services-view-model';

@Controller('barbershopservice')
export class BarbershopServiceCreateController {
  constructor(
    private readonly barbershopServiceCreateService: BarbershopServiceCreateService,
  ) {}

  @Post()
  async create(@Body() createBarbershopServiceDto: CreateBarbershopServiceDto) {
    const result = await this.barbershopServiceCreateService.execute({
      barbershop_id: createBarbershopServiceDto.barbershop_id,
      service_id: createBarbershopServiceDto.service_id,
      user_id: createBarbershopServiceDto.user_id,
      duration: createBarbershopServiceDto.duration,
      price: createBarbershopServiceDto.price,
    });
    return BarbershopServicesViewModel.toHttp(result);
  }
}
