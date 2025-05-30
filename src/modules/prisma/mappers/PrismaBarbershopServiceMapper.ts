import { BarbershopServiceRelations as RawBarbershopService } from '@prisma/client';
import { Barbershop_Service } from '@modules/barbershop_services/shared/entities/barbershop_services.entity';

export class PrismaBarbershopServiceMapper {
  static toPrisma(barbershop_service: Barbershop_Service) {
    return {
      barbershop_id: barbershop_service.barbershop_id,
      service_id: barbershop_service.service_id,
      duration: barbershop_service.duration,
      price: barbershop_service.price,
      created_at: barbershop_service.created_at,
      updated_at: barbershop_service.updated_at,
    };
  }

  static toDomain(raw: RawBarbershopService): Barbershop_Service {
    return new Barbershop_Service({
      barbershop_id: raw.barbershop_id,
      service_id: raw.service_id,
      duration: raw.duration,
      price: raw.price,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }
}
