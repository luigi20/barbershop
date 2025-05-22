import { Module } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from '@modules/user/shared/repositories/UserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { MemberRepository } from '@modules/member/shared/repositories/MemberRepository';
import { ClientCreateController } from './use_cases/create_client/controller/client_create.controller';
import { ClientCreateService } from './use_cases/create_client/service/client_create.service';
import { ClientDeleteController } from './use_cases/delete_client/controller/client_delete.controller';
import { ClientDeleteService } from './use_cases/delete_client/service/client_delete.service';
import { ClientGetController } from './use_cases/get_client/controller/client_get.controller';
import { ClientGetService } from './use_cases/get_client/service/client_get.service';
import { ClientGetAllService } from './use_cases/getall_client/service/client_getall.service';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { BarbershopRepository } from '@modules/barbershop/shared/repositories/BarbershopRepository';
import { ClientUpdateController } from './use_cases/update_barber/controller/client_update.controller';
import { ClientUpdateService } from './use_cases/update_barber/service/client_update.service';

@Module({
  controllers: [
    ClientCreateController,
    ClientUpdateController,
    ClientDeleteController,
    ClientGetController,
    ClientGetController,
  ],
  providers: [
    ClientCreateService,
    ClientUpdateService,
    ClientDeleteService,
    ClientGetAllService,
    ClientGetService,
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
export class ClientModule {}
