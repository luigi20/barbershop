import { Barber } from '../entities/barber.entity';

export class BarberViewModel {
  static toHttp(barber: Barber) {
    return {
      id: barber.id,
      user_id: barber.user_id,
      name: barber.name,
      created_at: barber.created_at,
      updated_at: barber.updated_at,
      //   user: barber.user ? barber.user : null,
    };
  }
}
