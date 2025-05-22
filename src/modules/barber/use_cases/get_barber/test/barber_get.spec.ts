import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { BarberGetService } from '../service/barber_get.service';

// Mock do método Cryptography.encrypt

describe('Test in setting barber module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should get barber', async () => {
    userRepository.list_user.push(makeUser());
    const barber_get_service = new BarberGetService(userRepository);
    const barber_get = await barber_get_service.execute('123456');
    expect(barber_get).toEqual(userRepository.list_user[0]);
  });

  it('should not get barber', async () => {
    userRepository.list_user.push(makeUser());
    const barber_get_service = new BarberGetService(userRepository);
    await expect(barber_get_service.execute('6')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
