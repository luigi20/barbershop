import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { UserGetAllService } from '../service/user_getall.service';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should get all user', async () => {
    userRepository.list_user.push(makeUser());
    const create_getall_service = new UserGetAllService(userRepository);
    const getall_user = await create_getall_service.execute();
    expect(getall_user.length).toEqual(1);
  });
});
