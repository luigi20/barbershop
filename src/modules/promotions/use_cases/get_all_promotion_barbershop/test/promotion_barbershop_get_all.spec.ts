import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryPromotionRepository } from '@modules/promotions/shared/repositories/test/inMemoryPromotionRepository';
import { makePromotion } from '@modules/promotions/shared/entities/test/promotion-factory';
import { PromotionBarbershopGetAllService } from '../service/get_all_promotion_barbershop.service';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';

describe('Test in setting Promotion list barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let promotionRepository: inMemoryPromotionRepository;

  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    promotionRepository = new inMemoryPromotionRepository();
  });
  it('should get Promotion list barbershop', async () => {
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
    const get_promotion_service = new PromotionBarbershopGetAllService(
      userRepository,
      barbershopRepository,
      promotionRepository,
    );
    const get_promotion = await get_promotion_service.execute({
      user_id: '123456',
      barbershop_id: '123456',
    });
    expect(get_promotion.length).toEqual(4);
  });

  it('should not get Promotion list, because user not exists', async () => {
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
    const get_promotion_service = new PromotionBarbershopGetAllService(
      userRepository,
      barbershopRepository,
      promotionRepository,
    );
    await expect(
      get_promotion_service.execute({
        user_id: '1234568',
        barbershop_id: '123456',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not get Promotion list, because barbershop not exists', async () => {
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
    const get_promotion_service = new PromotionBarbershopGetAllService(
      userRepository,
      barbershopRepository,
      promotionRepository,
    );
    await expect(
      get_promotion_service.execute({
        user_id: '123456',
        barbershop_id: '1456',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });
});
