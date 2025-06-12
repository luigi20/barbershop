import { AttendanceServiceViewModel } from '@modules/attendance_service/shared/view-models/attendance_service-view-model';
import { Attendance } from '../entities/attendance.entity';
import { BarbershopViewModel } from '@modules/barbershop/shared/view-models/barbershop-view-model';
import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';

export class AttendanceViewModel {
  static toHttp(attendance: Attendance) {
    return {
      id: attendance.id,
      barber_attendance_id: attendance.barber_attendance_id,
      barbershop_id: attendance.barbershop_id,
      barber_attendance_name: attendance.barber_attendance_name,
      barbershop_name: attendance.barbershop_name,
      status: attendance.status,
      barbershop: attendance.barbershop
        ? BarbershopViewModel.toHttp(attendance.barbershop)
        : null,
      barber_attendance: attendance.barber_attendance
        ? UserViewModel.toHttp(attendance.barber_attendance)
        : null,
      a:
        attendance.services_uses_attendance &&
        attendance.services_uses_attendance.length > 0
          ? attendance.services_uses_attendance.map((item) =>
              AttendanceServiceViewModel.toHttp(item),
            )
          : null,
    };
  }
}
