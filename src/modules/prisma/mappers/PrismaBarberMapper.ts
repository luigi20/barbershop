import { Barber } from '@modules/barber/shared/entities/barber.entity';
import { BarberRelations as RawBarber } from '@prisma/client';
export class PrismaBarberMapper {
  static toPrisma(barber: Barber) {
    return {
      id: barber.id,
      name: barber.name,
      user_id: barber.user_id,
      created_at: barber.created_at,
      updated_at: barber.updated_at,
    };
  }

  static toDomain(raw: RawBarber): Barber {
    return new Barber(
      {
        name: raw.name,
        user_id: raw.user_id,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
