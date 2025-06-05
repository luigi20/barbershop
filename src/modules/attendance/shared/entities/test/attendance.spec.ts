import { Attendance } from '../attendance.entity';

describe('Create Attendance', () => {
  it('should be able to create a attendance', () => {
    const attendance = new Attendance({
      barber_attendance_id: '123456',
      barbershop_id: '123456',
      status: 'não iniciado',
    });
    expect(attendance).toBeTruthy();
  });
});
