import { Barber } from '../../entities/barber.entity';

abstract class IBarberRepository {
  abstract create(data: Barber): Promise<void>;
  abstract findById(id: string): Promise<Barber | null>;
  abstract update(data: Barber): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(user_id: string): Promise<Barber | null>;
}

export { IBarberRepository };
