import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { inMemoryBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/test/inMemoryBarbershopServiceRepository';
import { BarbershopServiceCreateService } from '../service/create_barbershop_service.service';
import { inMemoryServiceRepository } from '@modules/services/shared/repositories/test/inMemoryServiceRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { makeService } from '@modules/services/shared/entities/test/services-factory';
import { randomUUID } from 'crypto';

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

  it('should add Barbershop Service', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new BarbershopServiceCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
    );
    const created_barbershop_service = await create_barbershop_service.execute({
      barbershop_id: barbershopRepository.list_barbershop[0].id,
      service_id: serviceRepository.list_service[0].id,
      duration: 30,
      price: 39.5,
      user_id: userRepository.list_user[0].id,
    });
    expect(barbershopServiceRepository.list_barbershop_service).toHaveLength(1);
    expect(barbershopServiceRepository.list_barbershop_service[0]).toEqual(
      created_barbershop_service,
    );
  });
  /*
  it('should not add Barbershop Service, because barbershop not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new BarbershopServiceCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: randomUUID(),
        service_id: serviceRepository.list_service[0].id,
        duration: 30,
        price: 39.5,
        user_id: userRepository.list_user[0].id,
      }),
    ).rejects.toThrow('Barbearia não existe');
  });

  it('should not add Barbershop Service, because service not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new BarbershopServiceCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: randomUUID(),
        duration: 30,
        price: 39.5,
        user_id: userRepository.list_user[0].id,
      }),
    ).rejects.toThrow('Serviço não cadastrado');
  });

  it('should not add Barbershop Service, because request not owner', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: randomUUID(),
      }),
    );
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new BarbershopServiceCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
        duration: 30,
        price: 39.5,
        user_id: userRepository.list_user[0].id,
      }),
    ).rejects.toThrow('Somente o proprietário pode alterar informações');
  });

  it('should not add Barbershop Service, because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new BarbershopServiceCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
        duration: 30,
        price: 39.5,
        user_id: randomUUID(),
      }),
    ).rejects.toThrow('Usuário não existe');
  });*/
});
