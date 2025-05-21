import { Open_Hours } from '../../entities/open_hours.entity';

abstract class IOpenHoursRepository {
  abstract create(data: Open_Hours): Promise<void>;
  abstract findByBarbershopId(barbershop_id: string): Promise<Open_Hours[]>;
  abstract update(data: Open_Hours): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export { IOpenHoursRepository };
