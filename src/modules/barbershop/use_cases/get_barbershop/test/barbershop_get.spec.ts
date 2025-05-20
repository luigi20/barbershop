import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { BarbershopGetService } from '../service/get_barbershop.service';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should get Barbershop list', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const get_barbershop_service = new BarbershopGetService(
      barbershopRepository,
      userRepository,
    );
    const get_barbershop = await get_barbershop_service.execute('123456');
    expect(barbershopRepository.list_barbershop).toEqual(get_barbershop);
  });

  it('should not get Barbershop list', async () => {
    const get_barbershop_service = new BarbershopGetService(
      barbershopRepository,
      userRepository,
    );
    await expect(get_barbershop_service.execute('123456')).rejects.toThrow(
      'Usuário não existe',
    );
  });
});
