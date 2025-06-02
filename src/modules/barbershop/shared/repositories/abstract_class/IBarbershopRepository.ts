import { IdAndNameAndOwnerBarbershop } from '@utils/types';
import { Barbershop } from '../../entities/barbershop.entity';

abstract class IBarbershopRepository {
  abstract create(data: Barbershop): Promise<void>;
  abstract findById(id: string): Promise<Barbershop | null>;
  abstract findByIdSelectId(id: string): Promise<string | null>;
  abstract findByOwnerId(owner_id: string): Promise<Barbershop[]>;
  abstract findByIdSelectIdAndNameAndOwnerId(
    id: string,
  ): Promise<IdAndNameAndOwnerBarbershop | null>;
  abstract findByAll(): Promise<Barbershop[]>;
  abstract update(data: Barbershop): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export { IBarbershopRepository };
