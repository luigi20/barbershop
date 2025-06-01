import { randomUUID } from 'crypto';
import { Promotion } from '../promotion.entity';

describe('Create Promotion', () => {
  it('should be able to create a Promotion', () => {
    const promotion = new Promotion({
      barbershop_id: randomUUID(),
      service_id: randomUUID(),
      discount_amount: 30,
      status: 'ativo',
    });
    expect(promotion).toBeTruthy();
  });
});
