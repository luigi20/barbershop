import { Attendance_Service } from '../entities/attendance_service.entity';

export class AttendanceServiceViewModel {
  static toHttp(attendance_service: Attendance_Service) {
    return {
      id: attendance_service.id,
      attendance_id: attendance_service.attendance_id,
      barbershop_id: attendance_service.barbershop_id,
      service_id: attendance_service.service_id,
      service_name: attendance_service.service_name,
      price: attendance_service.price,
    };
  }
}
