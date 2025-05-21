import { Open_Hours } from '../entities/open_hours.entity';

export class OpenHoursViewModel {
  static toHttp(open_hours: Open_Hours) {
    return {
      id: open_hours.id,
      barbershop_id: open_hours.barbershop_id,
      day_week: open_hours.day_week,
      open_time: open_hours.open_time,
      close_time: open_hours.close_time,
      //   user: barber.user ? barber.user : null,
    };
  }
}
