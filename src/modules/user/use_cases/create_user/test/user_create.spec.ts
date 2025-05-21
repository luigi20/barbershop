import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { UserCreateService } from '../service/user_create.service';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should add user', async () => {
    const create_user_service = new UserCreateService(userRepository);
    const created_user = await create_user_service.execute({
      email: 'teste2@gmail.com',
      name: 'Luis',
      password: '123456',
      phone: '5511988275940',
      role: 'ADMIN',
    });
    expect(userRepository.list_user).toHaveLength(1);
    expect(userRepository.list_user[0]).toEqual(created_user);
  });

  it('should not add user because emails equals', async () => {
    userRepository.list_user.push(makeUser());
    const create_user_service = new UserCreateService(userRepository);
    await expect(
      create_user_service.execute({
        email: 'teste@gmail.com',
        name: 'Luis',
        password: '123456',
        phone: '5511988275940',
        role: 'ADMIN',
      }),
    ).rejects.toThrow('Usuário já cadastrado com este email');
  });

  it('should not add user because role not exists', async () => {
    const create_user_service = new UserCreateService(userRepository);
    await expect(
      create_user_service.execute({
        email: 'teste@gmail.com',
        name: 'Luis',
        password: '123456',
        phone: '5511988275940',
        role: 'MEMBER',
      }),
    ).rejects.toThrow('Papel de usuário não permitido no sistema');
  });
});
