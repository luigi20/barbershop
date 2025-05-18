import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { UserDeleteService } from '../service/user_delete.service';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should delete user', async () => {
    userRepository.list_user.push(makeUser());
    const create_delete_service = new UserDeleteService(userRepository);
    await create_delete_service.execute('123456');
    expect(userRepository.list_user).toHaveLength(0);
  });

  it('should not delete user because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    const create_delete_service = new UserDeleteService(userRepository);
    await expect(create_delete_service.execute('123457')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
