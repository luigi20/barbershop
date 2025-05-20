import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { BarbershopDeleteService } from '../service/delete_barbershop.service';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should delete Barbershop', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const delete_barbershop_service = new BarbershopDeleteService(
      barbershopRepository,
      userRepository,
    );
    await delete_barbershop_service.execute('123456', '123456');
    expect(barbershopRepository.list_barbershop.length).toEqual(0);
  });
  it('should not delete Barbershop because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const delete_barbershop_service = new BarbershopDeleteService(
      barbershopRepository,
      userRepository,
    );
    await expect(
      delete_barbershop_service.execute('1234567', '123456'),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not delete Barbershop because barbershop not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const delete_barbershop_service = new BarbershopDeleteService(
      barbershopRepository,
      userRepository,
    );
    await expect(
      delete_barbershop_service.execute('123456', '1234567'),
    ).rejects.toThrow('Barbearia não existe');
  });
});
