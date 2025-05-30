import { Service } from '../services.entity';

describe('Create Services', () => {
  it('should be able to create a services', () => {
    const services = new Service({
      name: 'teste',
    });
    expect(services).toBeTruthy();
  });
});
