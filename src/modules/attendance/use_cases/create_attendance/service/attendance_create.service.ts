import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Attendance } from '@modules/attendance/shared/entities/attendance.entity';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { IAttendanceRepository } from '@modules/attendance/shared/repositories/abstract_class/IAttendanceRepository';
import { Attendance_Service } from '@modules/attendance_service/shared/entities/attendance_service.entity';
import { IAttendanceServiceRepository } from '@modules/attendance_service/shared/repositories/abstract_class/IAttendanceServiceRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';
import { Promotion } from '@modules/promotions/shared/entities/promotion.entity';
import { PrismaService } from '@modules/prisma/service/prisma.service';

interface IAttendanceCreateRequest {
  barbershop_id: string;
  barber_attendance_id: string;
  status: string;
  list_service_id: string[];
  list_promotion_id: string[];
  user_id: string;
}
@Injectable()
export class AttendanceCreateService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly memberRepository: IMemberRepository,
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly barbershopServiceRepository: IBarbershopServiceRepository,
    private readonly attendanceRepository: IAttendanceRepository,
    private readonly attendanceServiceRepository: IAttendanceServiceRepository,
    private readonly serviceRepository: IServiceRepository,
    private readonly promotionRepository: IPromotionRepository,
    private readonly prisma: PrismaService,
  ) {}
  public async execute({
    barber_attendance_id,
    barbershop_id,
    status,
    list_service_id,
    list_promotion_id,
    user_id,
  }: IAttendanceCreateRequest): Promise<Attendance> {
    return await this.prisma.$transaction(async (tx) => {
      const user_exists = await this.userRepository.findByIdAndName(user_id);
      if (!user_exists) throw new AppError('Usuário não existe', 404);
      const barbershop_exists =
        await this.barbershopRepository.findByIdSelectIdAndNameAndOwnerId(
          barbershop_id,
        );
      if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
      const member_barbershop_exists = await this.memberRepository.findById(
        barber_attendance_id,
        barbershop_exists.id,
      );
      if (!member_barbershop_exists)
        throw new AppError('Barbeiro não está cadastrado na barbearia', 404);
      const list_service_exists =
        await this.barbershopServiceRepository.findByListBarbershopIdAndServiceIdBoolean(
          barbershop_id,
          list_service_id,
        );
      if (!list_service_exists)
        throw new AppError(
          'Há serviços que não estão cadastrados nessa barbearia',
          404,
        );
      let list_promotions: Promotion[] = [];
      if (list_promotion_id) {
        list_promotions =
          await this.promotionRepository.findByListBarbershopIdAndListPromotion(
            list_promotion_id,
          );
      }
      const attendance = new Attendance({
        barbershop_id,
        status,
        barber_attendance_id,
      });
      await this.attendanceRepository.create(attendance, tx);
      const list_attendance_service: Attendance_Service[] = [];
      for (let i = 0; i < list_service_id.length; i++) {
        const attendance_service = new Attendance_Service({
          attendance_id: attendance.id,
          barbershop_id: barbershop_exists.id,
          service_id: list_service_id[i],
        });
        list_attendance_service.push(attendance_service);
      }
      await this.attendanceServiceRepository.createMany(
        list_attendance_service,
        tx,
      );
      const barber =
        await this.userRepository.findByIdAndName(barber_attendance_id);
      if (!barber) throw new AppError('Barbeiro não existe');
      attendance.barber_attendance_name = barber.name;
      attendance.barbershop_name = barbershop_exists.name;
      const list_attendance_service_id = list_attendance_service.map(
        (item) => item.service_id,
      );
      const list_service_name = await this.serviceRepository.findByIdsNames(
        list_attendance_service_id,
      );
      const listInfoServices =
        await this.barbershopServiceRepository.findByServiceIdsPrices(
          list_attendance_service_id,
          barbershop_id,
        );
      for (let i = 0; i < list_attendance_service.length; i++) {
        list_attendance_service[i].service_name = list_service_name[i];
        list_attendance_service[i].price = listInfoServices[i].price;
        list_attendance_service[i].duration = listInfoServices[i].duration;
      }
      if (list_promotions.length > 0) {
        for (let i = 0; i < list_attendance_service.length; i++) {
          const promotion = list_promotions.find(
            (promo) =>
              promo.service_id === list_attendance_service[i].service_id &&
              promo.barbershop_id === barbershop_id,
          );
          list_attendance_service[i].discount = promotion?.discount_amount || 0;
        }
      }
      attendance.services_uses_attendance = [
        ...(attendance.services_uses_attendance ?? []),
        ...list_attendance_service,
      ];
      return attendance;
    });
  }
}
