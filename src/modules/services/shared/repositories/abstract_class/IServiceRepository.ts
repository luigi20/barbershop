import { IdAndName } from '@utils/types';
import { Service } from '../../entities/services.entity';

abstract class IServiceRepository {
  abstract create(data: Service): Promise<void>;
  abstract findById(id: string): Promise<Service | null>;
  abstract findByIdAndName(id: string): Promise<IdAndName | null>;
  abstract findByIdGetAllAndName(): Promise<IdAndName[]>;
  abstract findByAll(): Promise<Service[]>;
  abstract update(data: Service): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findByIdSelectId(id: string): Promise<string | null>;
}

export { IServiceRepository };
