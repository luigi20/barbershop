import { Barbershop_Service } from '../entities/barbershop_services.entity';

export class BarbershopServicesViewModel {
  static toHttp(barbershopService: Barbershop_Service) {
    return {
      barbershop_id: barbershopService.barbershop_id,
      service_id: barbershopService.service_id,
      barbershop_name: barbershopService.barbershop_name,
      service_name: barbershopService.service_name,
      duration: barbershopService.duration,
      price: barbershopService.price,
      created_at: barbershopService.created_at,
      updated_at: barbershopService.updated_at,
    };
  }
}
