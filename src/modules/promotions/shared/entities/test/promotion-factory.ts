import { randomUUID } from 'crypto';
import { Promotion, Promotion_Props } from '../promotion.entity';
type Override = Partial<Promotion_Props>;
export function makePromotion(override: Override = {}) {
  return new Promotion({
    barbershop_id: randomUUID(),
    service_id: randomUUID(),
    discount_amount: 30,
    status: 'ativo',
    ...override,
  });
}
