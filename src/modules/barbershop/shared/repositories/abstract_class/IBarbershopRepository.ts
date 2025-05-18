import { Barbershop } from '../../entities/barbershop.entity';

abstract class IBarbershopRepository {
  abstract create(data: Barbershop): Promise<void>;
  abstract findById(id: string): Promise<Barbershop | null>;
  abstract findByOwnerId(owner_id: string): Promise<Barbershop[]>;
  abstract findByAll(): Promise<Barbershop[]>;
  abstract update(data: Barbershop): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export { IBarbershopRepository };
