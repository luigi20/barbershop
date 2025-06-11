import {
  Attendance_Status,
  AttendanceRelations as RawAttendance,
} from '@prisma/client';
import { PrismaUserMapper } from './PrismaUserMapper';
import { Attendance } from '@modules/attendance/shared/entities/attendance.entity';
import { PrismaBarbershopMapper } from './PrismaBarbershopMapper';
import { PrismaAttendanceServiceMapper } from './PrismaAttendanceServiceMapper';

export class PrismaAttendanceMapper {
  static toPrisma(attendance: Attendance) {
    return {
      id: attendance.id,
      barber_attendance_id: attendance.barber_attendance_id,
      barbershop_id: attendance.barbershop_id,
      status: attendance.status as Attendance_Status,
      created_at: attendance.created_at,
      updated_at: attendance.updated_at,
    };
  }

  static toDomain(raw: RawAttendance): Attendance {
    return new Attendance(
      {
        barber_attendance_id: raw.barber_attendance_id,
        barbershop_id: raw.barbershop_id,
        status: raw.status as string,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        barber_attendance: raw.barber_attendance
          ? PrismaUserMapper.toDomain(raw.barber_attendance)
          : null,
        barbershop: raw.barbershop
          ? PrismaBarbershopMapper.toDomain(raw.barbershop)
          : null,
        services_uses_attendance:
          raw.services_uses_attendance &&
          raw.services_uses_attendance.length > 0
            ? raw.services_uses_attendance.map((item) =>
                PrismaAttendanceServiceMapper.toDomain(item),
              )
            : [],
      },
      raw.id,
    );
  }
}
