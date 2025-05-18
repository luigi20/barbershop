import { Barbershop } from '../barbershop.entity';

describe('Create Barbershop', () => {
  it('should be able to create a barbershop', () => {
    const barbershop = new Barbershop({
      name: 'teste',
      owner_id: '123456',
    });
    expect(barbershop).toBeTruthy();
  });
});
