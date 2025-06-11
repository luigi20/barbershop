import { Attendance_Service } from '../attendance_service.entity';

describe('Create Attendance Service', () => {
  it('should be able to create a attendance service', () => {
    const attendance_service = new Attendance_Service({
      attendance_id: '123456',
      barbershop_id: '123456',
      service_id: '123456',
    });
    expect(attendance_service).toBeTruthy();
  });
});
