import { Open_Hours } from '../../entities/open_hours.entity';

abstract class IOpenHoursRepository {
  abstract createMany(data: Open_Hours[]): Promise<void>;
  abstract findByBarbershopId(barbershop_id: string): Promise<Open_Hours[]>;
  abstract updateMany(data: Open_Hours[]): Promise<void>;
  abstract deleteMany(id: string): Promise<void>;
}

export { IOpenHoursRepository };
