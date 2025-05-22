import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { BarberDeleteService } from '../service/barber_delete.service';

// Mock do método Cryptography.encrypt

describe('Test in setting barber module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should delete barber', async () => {
    userRepository.list_user.push(makeUser());
    const barber_delete_service = new BarberDeleteService(userRepository);
    await barber_delete_service.execute('123456');
    expect(userRepository.list_user).toHaveLength(0);
  });

  it('should not delete barber because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    const barber_delete_service = new BarberDeleteService(userRepository);
    await expect(barber_delete_service.execute('123457')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
