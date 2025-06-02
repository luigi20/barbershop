import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { inMemoryBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/test/inMemoryBarbershopServiceRepository';
import { makeBarbershopService } from '@modules/barbershop_services/shared/entities/test/barbershop_services-factory';
import { BarbershopServiceGetAllService } from '../service/get_all_barbershop_service.service';
import { inMemoryServiceRepository } from '@modules/services/shared/repositories/test/inMemoryServiceRepository';
import { makeService } from '@modules/services/shared/entities/test/services-factory';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let barbershopServiceRepository: inMemoryBarbershopServiceRepository;
  let serviceRepository: inMemoryServiceRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    barbershopServiceRepository = new inMemoryBarbershopServiceRepository();
    serviceRepository = new inMemoryServiceRepository();
    serviceRepository.list_service.push(makeService());
  });
  it('should get Barbershop Service list', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: '123456',
        service_id: '123456',
      }),
    );
    const get_barbershop_service = new BarbershopServiceGetAllService(
      userRepository,
      barbershopServiceRepository,
      barbershopRepository,
      serviceRepository,
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
        service_id: '123456',
      }),
    );
    const get_barbershop_service = new BarbershopServiceGetAllService(
      userRepository,
      barbershopServiceRepository,
      barbershopRepository,
      serviceRepository,
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
        service_id: '123456',
      }),
    );
    const get_barbershop_service = new BarbershopServiceGetAllService(
      userRepository,
      barbershopServiceRepository,
      barbershopRepository,
      serviceRepository,
    );
    await expect(
      get_barbershop_service.execute({
        barbershop_id: '1234560',
        user_id: '123456',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });
});
