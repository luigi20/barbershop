import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import {
  BarbershopRelations as RawBarbershop,
  Status_Barbershop,
} from '@prisma/client';
import { PrismaUserMapper } from './PrismaUserMapper';
import { PrismaOpenHoursMapper } from './PrismaOpenHoursMapper';

export class PrismaBarbershopMapper {
  static toPrisma(barbershop: Barbershop) {
    return {
      id: barbershop.id,
      name: barbershop.name,
      owner_id: barbershop.owner_id,
      status: barbershop.status as Status_Barbershop,
      street: barbershop.street,
      number: barbershop.number,
      instagram: barbershop.instagram,
      city: barbershop.city,
      phone: barbershop.phone,
      created_at: barbershop.created_at,
      updated_at: barbershop.updated_at,
    };
  }

  static toDomain(raw: RawBarbershop): Barbershop {
    return new Barbershop(
      {
        name: raw.name,
        owner_id: raw.owner_id,
        status: raw.status as string,
        owner_name: null,
        street: raw.street,
        number: raw.number,
        city: raw.city,
        instagram: raw.instagram ? raw.instagram : null,
        phone: raw.phone ? raw.phone : null,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        owner: raw.owner ? PrismaUserMapper.toDomain(raw.owner) : null,
        open_hours: raw.open_hours
          ? raw.open_hours.map((item) => PrismaOpenHoursMapper.toDomain(item))
          : [],
      },
      raw.id,
    );
  }
}
