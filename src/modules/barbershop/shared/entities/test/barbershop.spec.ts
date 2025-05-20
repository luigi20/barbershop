import { Barbershop } from '../barbershop.entity';

describe('Create Barbershop', () => {
  it('should be able to create a barbershop', () => {
    const barbershop = new Barbershop({
      name: 'teste',
      owner_id: '123456',
      street: 'ddeee',
      number: 223,
      city: 'rua 20',
      phone: '11992303059',
    });
    expect(barbershop).toBeTruthy();
  });
});
