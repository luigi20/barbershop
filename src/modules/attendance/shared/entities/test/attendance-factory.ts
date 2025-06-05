import { Attendance, Attendance_Props } from '../attendance.entity';

type Override = Partial<Attendance_Props>;
export function makeAttendance(override: Override = {}) {
  return new Attendance(
    {
      barber_attendance_id: '123456',
      barbershop_id: '123456',
      status: 'não iniciado',
      ...override,
    },
    '123456',
  );
}
