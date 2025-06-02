import { Module } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from '@modules/user/shared/repositories/UserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { MemberRepository } from '@modules/member/shared/repositories/MemberRepository';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { BarbershopRepository } from '@modules/barbershop/shared/repositories/BarbershopRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';
import { ServiceRepository } from '@modules/services/shared/repositories/ServiceRepository';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { BarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/BarbershopServiceRepository';
import { IPromotionRepository } from './shared/repositories/abstract_class/IPromotionRepository';
import { PromotionCreateController } from './use_cases/create_promotion/controller/promotion_create.controller';
import { PromotionCreateService } from './use_cases/create_promotion/service/create_promotion.service';
import { PromotionDeleteController } from './use_cases/delete_promotion/controller/promotion_delete.controller';
import { PromotionDeleteService } from './use_cases/delete_promotion/service/delete_promotion.service';
import { PromotionGetController } from './use_cases/get_promotion/controller/promotion_get.controller';
import { PromotionGetService } from './use_cases/get_promotion/service/get_promotion.service';
import { PromotionUpdateController } from './use_cases/update_promotion/controller/promotion_update.controller';
import { PromotionUpdateService } from './use_cases/update_promotion/service/update_promotion.service';
import { PromotionRepository } from './shared/repositories/PromotionRepository';

@Module({
  controllers: [
    PromotionCreateController,
    PromotionUpdateController,
    PromotionDeleteController,
    PromotionGetController,
  ],
  providers: [
    PromotionCreateService,
    PromotionUpdateService,
    PromotionDeleteService,
    PromotionGetService,
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
      provide: IPromotionRepository,
      useClass: PromotionRepository,
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
export class PromotionModule {}
