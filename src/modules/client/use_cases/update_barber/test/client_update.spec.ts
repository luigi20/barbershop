import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { ClientUpdateService } from '../service/client_update.service';

// Mock do método Cryptography.encrypt

describe('Test in setting client module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should update client', async () => {
    userRepository.list_user.push(makeUser());
    const client_update_service = new ClientUpdateService(userRepository);
    const client_update = await client_update_service.execute({
      email: 'teste2@gmail.com',
      name: 'Luis',
      password: '123456',
      id: '123456',
      phone: '5511988275940',
      role: 'ADMIN',
    });
    expect(userRepository.list_user[0]).toEqual(client_update);
  });

  it('should not update client', async () => {
    const client_update_service = new ClientUpdateService(userRepository);
    await expect(
      client_update_service.execute({
        email: 'teste@gmail.com',
        name: 'Luis',
        password: '123456',
        role: 'MEMBER',
        phone: '5511988275940',
        id: '123456',
      }),
    ).rejects.toThrow('Usuário não existe');
  });
});
