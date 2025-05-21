import { OpenHoursRelations as RawOpenHours } from '@prisma/client';
import { Open_Hours } from '@modules/open_hours/shared/entities/open_hours.entity';
import { PrismaBarbershopMapper } from './PrismaBarbershopMapper';

export class PrismaOpenHoursMapper {
  static toPrisma(open_hours: Open_Hours) {
    return {
      id: open_hours.id,
      barbershop_id: open_hours.barbershop_id,
      day_week: open_hours.day_week,
      open_time: open_hours.open_time,
      close_time: open_hours.close_time,
      created_at: open_hours.created_at,
      updated_at: open_hours.updated_at,
    };
  }

  static toDomain(raw: RawOpenHours): Open_Hours {
    return new Open_Hours(
      {
        barbershop_id: raw.barbershop_id,
        day_week: raw.day_week,
        open_time: raw.open_time,
        close_time: raw.close_time,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        barbershop: raw.barbershop
          ? PrismaBarbershopMapper.toDomain(raw.barbershop)
          : null,
      },
      raw.id,
    );
  }
}
