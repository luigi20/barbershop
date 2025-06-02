import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { Promotion } from '@modules/promotions/shared/entities/promotion.entity';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';

interface IPromotionGetRequest {
  user_id: string;
  promotion_id: string;
}

@Injectable()
export class PromotionGetService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly promotionRepository: IPromotionRepository,
  ) {}
  public async execute({
    user_id,
    promotion_id,
  }: IPromotionGetRequest): Promise<Promotion> {
    const user_exists = await this.userRepository.findByIdSelectId(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const promotion_exists =
      await this.promotionRepository.findById(promotion_id);
    if (!promotion_exists) throw new AppError('Promoção não existe', 404);
    return promotion_exists;
  }
}
