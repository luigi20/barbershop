import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryPromotionRepository } from '@modules/promotions/shared/repositories/test/inMemoryPromotionRepository';
import { makePromotion } from '@modules/promotions/shared/entities/test/promotion-factory';
import { PromotionGetAllService } from '../service/get_all_promotion.service';

describe('Test in setting Promotion list module', () => {
  let userRepository: inMemoryUserRepository;
  let promotionRepository: inMemoryPromotionRepository;

  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    promotionRepository = new inMemoryPromotionRepository();
  });
  it('should get Promotion list', async () => {
    userRepository.list_user.push(makeUser());
    promotionRepository.list_promotion.push(makePromotion());
    promotionRepository.list_promotion.push(makePromotion());
    promotionRepository.list_promotion.push(makePromotion());
    promotionRepository.list_promotion.push(makePromotion());
    const get_promotion_service = new PromotionGetAllService(
      userRepository,
      promotionRepository,
    );
    const get_promotion = await get_promotion_service.execute({
      user_id: '123456',
    });
    expect(get_promotion.length).toEqual(4);
  });

  it('should not get Promotion list, because user not exists', async () => {
    userRepository.list_user.push(makeUser());
    promotionRepository.list_promotion.push(makePromotion());
    promotionRepository.list_promotion.push(makePromotion());
    promotionRepository.list_promotion.push(makePromotion());
    promotionRepository.list_promotion.push(makePromotion());
    const get_promotion_service = new PromotionGetAllService(
      userRepository,
      promotionRepository,
    );
    await expect(
      get_promotion_service.execute({
        user_id: '1234568',
      }),
    ).rejects.toThrow('Usuário não existe');
  });
});
