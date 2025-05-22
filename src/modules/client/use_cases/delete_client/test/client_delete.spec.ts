import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { ClientDeleteService } from '../service/client_delete.service';

// Mock do método Cryptography.encrypt

describe('Test in setting client module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should delete client', async () => {
    userRepository.list_user.push(makeUser());
    const client_delete_service = new ClientDeleteService(userRepository);
    await client_delete_service.execute('123456');
    expect(userRepository.list_user).toHaveLength(0);
  });

  it('should not delete client because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    const client_delete_service = new ClientDeleteService(userRepository);
    await expect(client_delete_service.execute('123457')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
