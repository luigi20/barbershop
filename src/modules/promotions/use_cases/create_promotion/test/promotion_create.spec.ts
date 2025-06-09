import { inMemoryPromotionRepository } from '@modules/promotions/shared/repositories/test/inMemoryPromotionRepository';
import { PromotionCreateService } from '../service/create_promotion.service';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { inMemoryBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/test/inMemoryBarbershopServiceRepository';
import { makeService } from '@modules/services/shared/entities/test/services-factory';
import { inMemoryServiceRepository } from '@modules/services/shared/repositories/test/inMemoryServiceRepository';
import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { makeBarbershopService } from '@modules/barbershop_services/shared/entities/test/barbershop_services-factory';
import { randomUUID } from 'crypto';

describe('Test in setting Promotion module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let serviceRepository: inMemoryServiceRepository;
  let barbershopServiceRepository: inMemoryBarbershopServiceRepository;
  let promotionRepository: inMemoryPromotionRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    barbershopServiceRepository = new inMemoryBarbershopServiceRepository();
    serviceRepository = new inMemoryServiceRepository();
    promotionRepository = new inMemoryPromotionRepository();
  });

  it('should add Promotion', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const create_promotion_service = new PromotionCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    const created_promotion_service = await create_promotion_service.execute({
      barbershop_id: barbershopRepository.list_barbershop[0].id,
      service_id: serviceRepository.list_service[0].id,
      user_id: userRepository.list_user[0].id,
      discount_amount: 30,
      status: 'ativo',
    });
    expect(promotionRepository.list_promotion).toHaveLength(1);
    expect(promotionRepository.list_promotion[0]).toEqual(
      created_promotion_service,
    );
  });

  it('should not add promotion, because promotion not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_promotion_service = new PromotionCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      create_promotion_service.execute({
        barbershop_id: randomUUID(),
        service_id: serviceRepository.list_service[0].id,
        user_id: userRepository.list_user[0].id,
        discount_amount: 30,
        status: 'ativo',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });

  it('should not add Promotion, because service not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_promotion_service = new PromotionCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      create_promotion_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: randomUUID(),
        user_id: userRepository.list_user[0].id,
        discount_amount: 30,
        status: 'ativo',
      }),
    ).rejects.toThrow('Serviço não cadastrado');
  });

  it('should not add Promotion, because request not owner', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: randomUUID(),
      }),
    );
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new PromotionCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
        user_id: userRepository.list_user[0].id,
        discount_amount: 30,
        status: 'ativo',
      }),
    ).rejects.toThrow('Somente o proprietário pode alterar informações');
  });

  it('should not add Promotion, because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    const create_barbershop_service = new PromotionCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
        user_id: randomUUID(),
        discount_amount: 30,
        status: 'ativo',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not add Promotion, because barbershop service not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    serviceRepository.list_service.push(makeService({}, '1234'));
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const create_barbershop_service = new PromotionCreateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      create_barbershop_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[1].id,
        user_id: userRepository.list_user[0].id,
        discount_amount: 30,
        status: 'ativo',
      }),
    ).rejects.toThrow('Este serviço não existe na barbearia');
  });
});
