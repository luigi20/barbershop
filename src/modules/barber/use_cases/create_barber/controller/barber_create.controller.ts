import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Post, Body } from '@nestjs/common';
import { BarberCreateService } from '../service/barber_create.service';
import { CreateBarberDto } from '../dto/create-barber.dto';

@Controller('barber')
export class BarberCreateController {
  constructor(private readonly barberCreateService: BarberCreateService) {}

  @Post()
  async create(@Body() createBarberDto: CreateBarberDto) {
    const result = await this.barberCreateService.execute({
      email: createBarberDto.email,
      name: createBarberDto.name,
      password: createBarberDto.password,
      phone: createBarberDto.phone,
      barbershop_id: createBarberDto.barbershop_id,
    });
    return UserViewModel.toHttp(result);
  }
}
