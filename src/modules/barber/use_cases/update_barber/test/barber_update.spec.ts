import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { BarberUpdateService } from '../service/barber_update.service';

// Mock do método Cryptography.encrypt

describe('Test in setting barber module', () => {
  let userRepository: inMemoryUserRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
  });
  it('should update Barber', async () => {
    userRepository.list_user.push(makeUser());
    const barber_update_service = new BarberUpdateService(userRepository);
    const barber_update = await barber_update_service.execute({
      email: 'teste2@gmail.com',
      name: 'Luis',
      password: '123456',
      id: '123456',
      phone: '5511988275940',
      role: 'ADMIN',
    });
    expect(userRepository.list_user[0]).toEqual(barber_update);
  });

  it('should not update Barber', async () => {
    const barber_update_service = new BarberUpdateService(userRepository);
    await expect(
      barber_update_service.execute({
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
