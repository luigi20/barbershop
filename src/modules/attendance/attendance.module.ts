import { Module } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from '@modules/user/shared/repositories/UserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { MemberRepository } from '@modules/member/shared/repositories/MemberRepository';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { BarbershopRepository } from '@modules/barbershop/shared/repositories/BarbershopRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';
import { ServiceRepository } from '@modules/services/shared/repositories/ServiceRepository';
import { AttendanceCreateController } from './use_cases/create_attendance/controller/attendance_create.controller';
import { AttendanceCreateService } from './use_cases/create_attendance/service/attendance_create.service';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { BarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/BarbershopServiceRepository';
import { IAttendanceRepository } from './shared/repositories/abstract_class/IAttendanceRepository';
import { AttendanceRepository } from './shared/repositories/AttendanceRepository';
import { IAttendanceServiceRepository } from '@modules/attendance_service/shared/repositories/abstract_class/IAttendanceServiceRepository';
import { AttendanceServiceRepository } from '@modules/attendance_service/shared/repositories/AttendanceServiceRepository';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';
import { PromotionRepository } from '@modules/promotions/shared/repositories/PromotionRepository';

@Module({
  controllers: [AttendanceCreateController],
  providers: [
    AttendanceCreateService,
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
    {
      provide: IAttendanceRepository,
      useClass: AttendanceRepository,
    },
    {
      provide: IAttendanceServiceRepository,
      useClass: AttendanceServiceRepository,
    },
    {
      provide: IPromotionRepository,
      useClass: PromotionRepository,
    },
  ],
})
export class AttendanceModule {}
