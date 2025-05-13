import { Module } from '@nestjs/common';
import { BarberController } from './create_barber/controller/barber.controller';
import { BarberService } from './create_barber/service/barber.service';

@Module({
  controllers: [BarberController],
  providers: [BarberService],
})
export class BarberModule {}
