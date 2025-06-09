import { inMemoryPromotionRepository } from '@modules/promotions/shared/repositories/test/inMemoryPromotionRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { inMemoryBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/test/inMemoryBarbershopServiceRepository';
import { makeService } from '@modules/services/shared/entities/test/services-factory';
import { inMemoryServiceRepository } from '@modules/services/shared/repositories/test/inMemoryServiceRepository';
import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { makeBarbershopService } from '@modules/barbershop_services/shared/entities/test/barbershop_services-factory';
import { randomUUID } from 'crypto';
import { PromotionUpdateService } from '../service/update_promotion.service';
import { makePromotion } from '@modules/promotions/shared/entities/test/promotion-factory';

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
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await update_promotion_service.execute({
      barbershop_id: barbershopRepository.list_barbershop[0].id,
      user_id: userRepository.list_user[0].id,
      service_id: serviceRepository.list_service[0].id,
      discount_amount: 40,
      status: 'ativo',
      id: '123456',
    });
    expect(promotionRepository.list_promotion[0].discount_amount).toEqual(40);
  });

  it('should not update promotion, because promotion not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      update_promotion_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        service_id: serviceRepository.list_service[0].id,
        discount_amount: 40,
        status: 'ativo',
        id: '1234569',
      }),
    ).rejects.toThrow('Promoção não existe');
  });

  it('should not update promotion, because service not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      update_promotion_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        service_id: randomUUID(),
        discount_amount: 40,
        status: 'ativo',
        id: '123456',
      }),
    ).rejects.toThrow('Serviço não existe');
  });

  it('should not update promotion, because barbershop not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      update_promotion_service.execute({
        barbershop_id: randomUUID(),
        user_id: userRepository.list_user[0].id,
        service_id: serviceRepository.list_service[0].id,
        discount_amount: 40,
        status: 'ativo',
        id: '123456',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });

  it('should not update promotion, because is not owner', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: '1',
      }),
    );
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      update_promotion_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        service_id: serviceRepository.list_service[0].id,
        discount_amount: 40,
        status: 'ativo',
        id: '123456',
      }),
    ).rejects.toThrow('Somente o proprietário pode alterar informações');
  });

  it('should not update promotion, because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      update_promotion_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: randomUUID(),
        service_id: serviceRepository.list_service[0].id,
        discount_amount: 40,
        status: 'ativo',
        id: '123456',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not update promotion, because service not exists in barbershop', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    serviceRepository.list_service.push(makeService());
    serviceRepository.list_service.push(makeService({}, '454543'));
    barbershopServiceRepository.list_barbershop_service.push(
      makeBarbershopService({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        service_id: serviceRepository.list_service[0].id,
      }),
    );
    const update_promotion_service = new PromotionUpdateService(
      barbershopRepository,
      userRepository,
      serviceRepository,
      barbershopServiceRepository,
      promotionRepository,
    );
    await expect(
      update_promotion_service.execute({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        service_id: serviceRepository.list_service[1].id,
        discount_amount: 40,
        status: 'ativo',
        id: '123456',
      }),
    ).rejects.toThrow('Este serviço não existe na barbearia');
  });
});
