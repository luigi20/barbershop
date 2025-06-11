import { Attendance_Service } from '../../entities/attendance_service.entity';

abstract class IAttendanceServiceRepository {
  abstract createMany(data: Attendance_Service[]): Promise<void>;
  abstract findById(attendance_id: string): Promise<Attendance_Service[]>;
  abstract findByIdSelectId(id: string): Promise<string | null>;
  abstract findByAll(): Promise<Attendance_Service[]>;
  abstract update(data: Attendance_Service): Promise<void>;
  abstract delete(service_id: string, attendance_id: string): Promise<void>;
}

export { IAttendanceServiceRepository };
