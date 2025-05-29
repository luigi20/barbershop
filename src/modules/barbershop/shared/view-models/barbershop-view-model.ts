import { Barbershop } from '../entities/barbershop.entity';

export class BarbershopViewModel {
  static toHttp(barbershop: Barbershop) {
    return {
      id: barbershop.id,
      name_barbershop: barbershop.name,
      owner_name: barbershop.owner_name,
      owner_id: barbershop.owner_id,
      status: barbershop.status,
      phone: barbershop.phone,
      instagram: barbershop.instagram,
      //   user: barber.user ? barber.user : null,
    };
  }
}
