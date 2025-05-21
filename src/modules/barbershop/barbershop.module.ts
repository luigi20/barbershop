import { Module } from '@nestjs/common';
import { IBarbershopRepository } from './shared/repositories/abstract_class/IBarbershopRepository';
import { BarbershopRepository } from './shared/repositories/BarbershopRepository';
import { BarbershopCreateController } from './use_cases/create_barbershop/controller/barbershop_create.controller';
import { BarbershopCreateService } from './use_cases/create_barbershop/service/create_barbershop.service';
import { BarbershopDeleteController } from './use_cases/delete_barbershop/controller/barbershop_delete.controller';
import { BarbershopDeleteService } from './use_cases/delete_barbershop/service/delete_barbershop.service';
import { BarbershopGetController } from './use_cases/get_barbershop/controller/barbershop_get.controller';
import { BarbershopGetService } from './use_cases/get_barbershop/service/get_barbershop.service';
import { BarbershopUpdateController } from './use_cases/update_barbershop/controller/barbershop_update.controller';
import { BarbershopUpdateService } from './use_cases/update_barbershop/service/update_barbershop.service';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from '@modules/user/shared/repositories/UserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { MemberRepository } from '@modules/member/shared/repositories/MemberRepository';

@Module({
  controllers: [
    BarbershopCreateController,
    BarbershopUpdateController,
    BarbershopDeleteController,
    BarbershopGetController,
  ],
  providers: [
    BarbershopCreateService,
    BarbershopUpdateService,
    BarbershopDeleteService,
    BarbershopGetService,
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
  ],
})
export class BarbershopModule {}
