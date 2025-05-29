import { Service } from '../../entities/services.entity';

abstract class IServiceRepository {
  abstract create(data: Service): Promise<void>;
  abstract findById(id: string): Promise<Service | null>;
  abstract findByAll(): Promise<Service[]>;
  abstract update(data: Service): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export { IServiceRepository };
