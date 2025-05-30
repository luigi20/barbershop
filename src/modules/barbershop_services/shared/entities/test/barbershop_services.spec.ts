import { randomUUID } from 'crypto';
import { Barbershop_Service } from '../barbershop_services.entity';

describe('Create Barber Service', () => {
  it('should be able to create a Barber Service', () => {
    const barbershop_service = new Barbershop_Service({
      barbershop_id: randomUUID(),
      service_id: randomUUID(),
      duration: 30,
      price: 30.5,
    });
    expect(barbershop_service).toBeTruthy();
  });
});
