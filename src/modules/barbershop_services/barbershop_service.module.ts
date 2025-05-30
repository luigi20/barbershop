import { Module } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from '@modules/user/shared/repositories/UserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { MemberRepository } from '@modules/member/shared/repositories/MemberRepository';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { BarbershopRepository } from '@modules/barbershop/shared/repositories/BarbershopRepository';
import { BarbershopServiceCreateController } from './use_cases/create_barbershop_service/controller/barbershop_service_create.controller';
import { BarbershopServiceCreateService } from './use_cases/create_barbershop_service/service/create_barbershop_service.service';
import { BarbershopServiceDeleteController } from './use_cases/delete_barbershop_service/controller/barbershop_service_delete.controller';
import { BarbershopServiceDeleteService } from './use_cases/delete_barbershop_service/service/delete_barbershop_service.service';
import { BarbershopServiceGetController } from './use_cases/get_barbershop_service/controller/barbershop_service_get.controller';
import { BarbershopServiceGetService } from './use_cases/get_barbershop_service/service/get_barbershop_service.service';
import { BarbershopServiceUpdateController } from './use_cases/update_barbershop_service/controller/barbershop_update.controller';
import { BarbershopServiceUpdateService } from './use_cases/update_barbershop_service/service/update_barbershop_service.service';
import { IBarbershopServiceRepository } from './shared/repositories/abstract_class/IBarbershopServiceRepository';
import { BarbershopServiceRepository } from './shared/repositories/BarbershopServiceRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';
import { ServiceRepository } from '@modules/services/shared/repositories/ServiceRepository';

@Module({
  controllers: [
    BarbershopServiceCreateController,
    BarbershopServiceUpdateController,
    BarbershopServiceDeleteController,
    BarbershopServiceGetController,
  ],
  providers: [
    BarbershopServiceCreateService,
    BarbershopServiceUpdateService,
    BarbershopServiceDeleteService,
    BarbershopServiceGetService,
    {
      provide: IBarbershopRepository,
      useClass: BarbershopRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IMemberRepository,
      useClass: MemberRepository,
    },
    {
      provide: IBarbershopServiceRepository,
      useClass: BarbershopServiceRepository,
    },
    {
      provide: IServiceRepository,
      useClass: ServiceRepository,
    },
  ],
})
export class BarbershopServiceModule {}
