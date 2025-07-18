import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { UserUpdateService } from '../service/user_update.service';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should update user', async () => {
    userRepository.list_user.push(makeUser());
    const create_update_service = new UserUpdateService(userRepository);
    const updated_user = await create_update_service.execute({
      email: 'teste2@gmail.com',
      name: 'Luis',
      password: '1234569',
      id: '123456',
      phone: '5511988275940',
      role: 'ADMIN',
      status: 'ativo',
    });
    expect(userRepository.list_user[0]).toEqual(updated_user);
  });

  it('should not update user', async () => {
    const create_update_service = new UserUpdateService(userRepository);
    await expect(
      create_update_service.execute({
        email: 'teste@gmail.com',
        name: 'Luis',
        password: '123456',
        role: 'MEMBER',
        phone: '5511988275940',
        id: '123456',
        status: 'ativo',
      }),
    ).rejects.toThrow('Usuário não existe');
  });
});
