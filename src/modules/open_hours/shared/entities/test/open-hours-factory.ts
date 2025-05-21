import { Open_Hours, Open_Hours_Props } from '../open_hours.entity';

type Override = Partial<Open_Hours_Props>;
export function makeOpenHours(override: Override = {}) {
  return new Open_Hours(
    {
      barbershop_id: '123456',
      close_time: new Date(),
      open_time: new Date(),
      day_week: 1,
      ...override,
    },
    '123456',
  );
}
