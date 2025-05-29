import { OpenHoursViewModel } from '@modules/open_hours/shared/view-models/open_hours-view-model';
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
      open_hours: barbershop.open_hours.map((item) =>
        OpenHoursViewModel.toHttp(item),
      ),
    };
  }
}
