import { Module } from '@nestjs/common';
import { BarberCreateController } from './use_cases/create_barber/controller/barber_create.controller';
import { BarberCreateService } from './use_cases/create_barber/service/barber_create.service';
import { BarberDeleteController } from './use_cases/delete_barber/controller/barber_delete.controller';
import { BarberDeleteService } from './use_cases/delete_barber/service/barber_delete.service';
import { BarberGetController } from './use_cases/get_barber/controller/barber_get.controller';
import { BarberGetService } from './use_cases/get_barber/service/barber_get.service';
import { BarberGetAllService } from './use_cases/getall_barber/service/barber_getall.service';
import { BarberUpdateController } from './use_cases/update_barber/controller/barber_update.controller';
import { BarberUpdateService } from './use_cases/update_barber/service/barber_update.service';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from '@modules/user/shared/repositories/UserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { MemberRepository } from '@modules/member/shared/repositories/MemberRepository';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { BarbershopRepository } from '@modules/barbershop/shared/repositories/BarbershopRepository';

@Module({
  controllers: [
    BarberCreateController,
    BarberUpdateController,
    BarberDeleteController,
    BarberGetController,
    BarberGetController,
  ],
  providers: [
    BarberCreateService,
    BarberUpdateService,
    BarberDeleteService,
    BarberGetAllService,
    BarberGetService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IMemberRepository,
      useClass: MemberRepository,
    },
    {
      provide: IBarbershopRepository,
      useClass: BarbershopRepository,
    },
  ],
})
export class BarberModule {}
