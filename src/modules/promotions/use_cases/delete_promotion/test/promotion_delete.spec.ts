/*import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { inMemoryBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/test/inMemoryBarbershopServiceRepository';
import { inMemoryServiceRepository } from '@modules/services/shared/repositories/test/inMemoryServiceRepository';
import { makeService } from '@modules/services/shared/entities/test/services-factory';
import { makeBarbershopService } from '@modules/barbershop_services/shared/entities/test/barbershop_services-factory';
import { BarbershopServiceDeleteService } from '@modules/barbershop_services/use_cases/delete_barbershop_service/service/delete_barbershop_service.service';

describe('Test in setting Barbershop Service module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let serviceRepository: inMemoryServiceRepository;
  let barbershopServiceRepository: inMemoryBarbershopServiceRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    barbershopServiceRepository = new inMemoryBarbershopServiceRepository();
    serviceRepository = new inMemoryServiceRepository();
  });
  it('should delete Barbershop Service', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const delete_barbershop_service = new BarbershopServiceDeleteService(
      barbershopRepository,
      userRepository,
      barbershopServiceRepository,
      serviceRepository,
    );
    await delete_barbershop_service.execute({
      barbershop_id: '123456',
      user_id: '123456',
      service_id: '123456',
    });
    expect(barbershopServiceRepository.list_barbershop_service.length).toEqual(
      0,
    );
  });
  it('should not delete Barbershop because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const delete_barbershop_service = new BarbershopServiceDeleteService(
      barbershopRepository,
      userRepository,
      barbershopServiceRepository,
      serviceRepository,
    );
    await expect(
      delete_barbershop_service.execute({
        barbershop_id: '123456',
        user_id: '1234567',
        service_id: '123456',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not delete Barbershop Service because barbershop not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const delete_barbershop_service = new BarbershopServiceDeleteService(
      barbershopRepository,
      userRepository,
      barbershopServiceRepository,
      serviceRepository,
    );
    await expect(
      delete_barbershop_service.execute({
        barbershop_id: '1234568',
        user_id: '123456',
        service_id: '123456',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });

  it('should not delete Barbershop Service because service not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const delete_barbershop_service = new BarbershopServiceDeleteService(
      barbershopRepository,
      userRepository,
      barbershopServiceRepository,
      serviceRepository,
    );
    await expect(
      delete_barbershop_service.execute({
        barbershop_id: '123456',
        user_id: '123456',
        service_id: '1234569',
      }),
    ).rejects.toThrow('Serviço não existe na barbearia');
  });
});
*/
