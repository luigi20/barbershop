import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { UserGetService } from '../service/user_get.service';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should get user', async () => {
    userRepository.list_user.push(makeUser());
    const create_get_service = new UserGetService(userRepository);
    const getall_user = await create_get_service.execute('123456');
    expect(getall_user).toEqual(userRepository.list_user[0]);
  });

  it('should not get user', async () => {
    userRepository.list_user.push(makeUser());
    const create_get_service = new UserGetService(userRepository);
    await expect(create_get_service.execute('6')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
