import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryPromotionRepository } from '@modules/promotions/shared/repositories/test/inMemoryPromotionRepository';
import { PromotionDeleteService } from '../service/delete_promotion.service';
import { makePromotion } from '@modules/promotions/shared/entities/test/promotion-factory';

describe('Test in setting Promotion module', () => {
  let userRepository: inMemoryUserRepository;
  let promotionRepository: inMemoryPromotionRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    promotionRepository = new inMemoryPromotionRepository();
  });
  it('should delete Promotion', async () => {
    userRepository.list_user.push(makeUser());
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: '123456',
        service_id: '123456',
      }),
    );
    const delete_promotion_service = new PromotionDeleteService(
      userRepository,
      promotionRepository,
    );
    await delete_promotion_service.execute({
      user_id: '123456',
      id: '123456',
    });
    expect(promotionRepository.list_promotion.length).toEqual(0);
  });

  it('should not delete Promotion because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    const delete_promotion_service = new PromotionDeleteService(
      userRepository,
      promotionRepository,
    );
    await expect(
      delete_promotion_service.execute({
        user_id: '1234567',
        id: '123456',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not delete Promotion because promotion not exists', async () => {
    userRepository.list_user.push(makeUser());
    const delete_promotion_service = new PromotionDeleteService(
      userRepository,
      promotionRepository,
    );
    await expect(
      delete_promotion_service.execute({
        user_id: '123456',
        id: '1234569',
      }),
    ).rejects.toThrow('Promoção não existe');
  });
  /*
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
  });*/
});
