import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { ClientGetService } from '../service/client_get.service';

// Mock do método Cryptography.encrypt

describe('Test in setting client module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should get client', async () => {
    userRepository.list_user.push(makeUser());
    const client_get_service = new ClientGetService(userRepository);
    const client_get = await client_get_service.execute('123456');
    expect(client_get).toEqual(userRepository.list_user[0]);
  });

  it('should not get client', async () => {
    userRepository.list_user.push(makeUser());
    const client_get_service = new ClientGetService(userRepository);
    await expect(client_get_service.execute('6')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
