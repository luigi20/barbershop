import { Barbershop_Service } from '../../entities/barbershop_services.entity';

abstract class IBarbershopServiceRepository {
  abstract create(data: Barbershop_Service): Promise<void>;
  abstract findByBarbershopId(id: string): Promise<Barbershop_Service[]>;
  abstract findByServiceId(id: string): Promise<Barbershop_Service[]>;
  abstract findByAll(): Promise<Barbershop_Service[]>;
  abstract update(data: Barbershop_Service): Promise<void>;
  abstract delete(barbershop_id: string, service_id: string): Promise<void>;
  abstract findByBarbershopIdAndServiceId(
    barbershop_id: string,
    service_id: string,
  ): Promise<Barbershop_Service | null>;
  abstract findByBarbershopIdAndServiceIdBoolean(
    barbershop_id: string,
    service_id: string,
  ): Promise<boolean | null>;
}

export { IBarbershopServiceRepository };
