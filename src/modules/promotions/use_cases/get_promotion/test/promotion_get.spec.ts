import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryPromotionRepository } from '@modules/promotions/shared/repositories/test/inMemoryPromotionRepository';
import { makePromotion } from '@modules/promotions/shared/entities/test/promotion-factory';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { PromotionGetService } from '../service/get_promotion.service';

describe('Test in get Promotion module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let promotionRepository: inMemoryPromotionRepository;

  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    promotionRepository = new inMemoryPromotionRepository();
  });
  it('should get Promotion ', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: userRepository.list_user[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
      }),
    );
    const get_promotion_service = new PromotionGetService(
      userRepository,
      promotionRepository,
    );
    const get_promotion = await get_promotion_service.execute({
      user_id: '123456',
      promotion_id: '123456',
    });
    expect(get_promotion).toEqual(promotionRepository.list_promotion[0]);
  });

  it('should not get Promotion, because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: userRepository.list_user[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
      }),
    );
    const get_promotion_service = new PromotionGetService(
      userRepository,
      promotionRepository,
    );
    await expect(
      get_promotion_service.execute({
        user_id: '1234568',
        promotion_id: '123456',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not get Promotion, because promotion not exists', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: userRepository.list_user[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
      }),
    );
    promotionRepository.list_promotion.push(
      makePromotion({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
      }),
    );
    const get_promotion_service = new PromotionGetService(
      userRepository,
      promotionRepository,
    );
    await expect(
      get_promotion_service.execute({
        user_id: '123456',
        promotion_id: '1456',
      }),
    ).rejects.toThrow('Promoção não existe');
  });
});
