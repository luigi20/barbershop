import {
  Attendance_Service,
  Attendance_Service_Props,
} from '../attendance_service.entity';

type Override = Partial<Attendance_Service_Props>;
export function makeAttendanceService(override: Override = {}) {
  return new Attendance_Service(
    {
      attendance_id: '123456',
      service_id: '123456',
      barbershop_id: '123456',
      ...override,
    },
    '123456',
  );
}
