/*import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { inMemoryBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/test/inMemoryBarbershopServiceRepository';
import { makeBarbershopService } from '@modules/barbershop_services/shared/entities/test/barbershop_services-factory';
import { BarbershopServiceGetService } from '@modules/barbershop_services/use_cases/get_barbershop_service/service/get_barbershop_service.service';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let barbershopServiceRepository: inMemoryBarbershopServiceRepository;

  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    barbershopServiceRepository = new inMemoryBarbershopServiceRepository();
  });
  it('should get Barbershop Service list', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: '123456',
      }),
    );
    const get_barbershop_service = new BarbershopServiceGetService(
      userRepository,
      barbershopServiceRepository,
      barbershopRepository,
    );
    const get_barbershop = await get_barbershop_service.execute({
      barbershop_id: '123456',
      user_id: '123456',
    });
    expect(barbershopServiceRepository.list_barbershop_service).toEqual(
      get_barbershop,
    );
  });

  it('should not get Barbershop Service list, because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: '123456',
      }),
    );
    const get_barbershop_service = new BarbershopServiceGetService(
      userRepository,
      barbershopServiceRepository,
      barbershopRepository,
    );
    await expect(
      get_barbershop_service.execute({
        barbershop_id: '123456',
        user_id: '1234568',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not get Barbershop Service list, because narbershop service not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: '123456',
      }),
    );
    const get_barbershop_service = new BarbershopServiceGetService(
      userRepository,
      barbershopServiceRepository,
      barbershopRepository,
    );
    await expect(
      get_barbershop_service.execute({
        barbershop_id: '1234560',
        user_id: '123456',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });
});
*/
