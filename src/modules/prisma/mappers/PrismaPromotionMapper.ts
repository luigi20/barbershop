import { PromotionRelations as RawPromotion } from '@prisma/client';
import { Promotion } from '@modules/promotions/shared/entities/promotion.entity';
import { PrismaBarbershopServiceMapper } from './PrismaBarbershopServiceMapper';

export class PrismaPromotionMapper {
  static toPrisma(promotion: Promotion) {
    return {
      barbershop_id: promotion.barbershop_id,
      service_id: promotion.service_id,
      discount_amount: promotion.discount_amount,
      status: promotion.status,
      created_at: promotion.created_at,
      updated_at: promotion.updated_at,
    };
  }

  static toDomain(raw: RawPromotion): Promotion {
    return new Promotion({
      barbershop_id: raw.barbershop_id,
      service_id: raw.service_id,
      discount_amount: raw.discount_amount,
      status: raw.status,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      barbershop_service: raw.barbershop_service
        ? PrismaBarbershopServiceMapper.toDomain(raw.barbershop_service)
        : null,
    });
  }
}
