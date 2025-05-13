import { Controller, Post, Body } from '@nestjs/common';
import { CreateBarberDto } from '../dto/create-barber.dto';
import { BarberService } from '../service/barber.service';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  create(@Body() createBarberDto: CreateBarberDto) {
    const result = this.barberService.execute(createBarberDto);
    return result;
  }
}
