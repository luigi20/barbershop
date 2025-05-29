import { ServiceRelations as RawService } from '@prisma/client';
import { Service } from '@modules/services_barbershop/shared/entities/services.entity';

export class PrismaServiceMapper {
  static toPrisma(service: Service) {
    return {
      id: service.id,
      name: service.name,
      created_at: service.created_at,
      updated_at: service.updated_at,
    };
  }

  static toDomain(raw: RawService): Service {
    return new Service(
      {
        name: raw.name,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
