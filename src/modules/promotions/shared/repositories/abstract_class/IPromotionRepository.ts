import { Promotion } from '../../entities/promotion.entity';

abstract class IPromotionRepository {
  abstract create(data: Promotion): Promise<void>;
  abstract findByBarbershopId(id: string): Promise<Promotion[]>;
  abstract findByServiceId(id: string): Promise<Promotion[]>;
  abstract findByAll(): Promise<Promotion[]>;
  abstract update(data: Promotion): Promise<void>;
  abstract delete(barbershop_id: string, service_id: string): Promise<void>;
  abstract findByBarbershopIdAndServiceId(
    barbershop_id: string,
    service_id: string,
  ): Promise<Promotion | null>;
}

export { IPromotionRepository };
