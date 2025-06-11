import { AttendanceServiceRelations as RawAttendanceService } from '@prisma/client';
import { Attendance_Service } from '@modules/attendance_service/shared/entities/attendance_service.entity';
import { PrismaAttendanceMapper } from './PrismaAttendanceMapper';
import { PrismaBarbershopServiceMapper } from './PrismaBarbershopServiceMapper';

export class PrismaAttendanceServiceMapper {
  static toPrisma(attendance_service: Attendance_Service) {
    return {
      id: attendance_service.id,
      barbershop_id: attendance_service.barbershop_id,
      service_id: attendance_service.service_id,
      attendance_id: attendance_service.attendance_id,
      created_at: attendance_service.created_at,
      updated_at: attendance_service.updated_at,
    };
  }

  static toDomain(raw: RawAttendanceService): Attendance_Service {
    return new Attendance_Service({
      barbershop_id: raw.barbershop_id,
      attendance_id: raw.attendance_id,
      service_name: null,
      service_id: raw.service_id,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      attendance: raw.attendance
        ? PrismaAttendanceMapper.toDomain(raw.attendance)
        : null,
      services_attendance:
        raw.services_attendance && raw.services_attendance.length
          ? raw.services_attendance.map((item) =>
              PrismaBarbershopServiceMapper.toDomain(item),
            )
          : null,
    });
  }
}
