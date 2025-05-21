import { Open_Hours } from '../open_hours.entity';

describe('Create Open Hours', () => {
  it('should be able to create a Open Hours', () => {
    const open_hours = new Open_Hours({
      barbershop_id: '123456',
      close_time: new Date(),
      open_time: new Date(),
      day_week: 1,
    });
    expect(open_hours).toBeTruthy();
  });
});
