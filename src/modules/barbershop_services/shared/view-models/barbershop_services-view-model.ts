import { Barbershop_Service } from '../entities/barbershop_services.entity';

export class BarbershopServicesViewModel {
  static toHttp(barbershopService: Barbershop_Service) {
    return {
      barbershop_id: barbershopService.barbershop_id,
      service_id: barbershopService.service_id,
      duration: barbershopService.duration,
      price: barbershopService.price,
      created_at: barbershopService.created_at,
      updated_at: barbershopService.updated_at,
    };
  }
}
