import { Promotion } from '../entities/promotion.entity';
import { BarbershopServicesViewModel } from '@modules/barbershop_services/shared/view-models/barbershop_services-view-model';

export class PromotionViewModel {
  static toHttp(promotion: Promotion) {
    return {
      id: promotion.id,
      barbershop_id: promotion.barbershop_id,
      service_id: promotion.service_id,
      barbershop_name: promotion.barbershop_name,
      service_name: promotion.service_name,
      discount_amount: promotion.discount_amount,
      status: promotion.status,
      created_at: promotion.created_at,
      updated_at: promotion.updated_at,
      barbershop_service: promotion.barbershop_service
        ? BarbershopServicesViewModel.toHttp(promotion.barbershop_service)
        : null,
    };
  }
}
