import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';

interface IPromotionDeleteRequest {
  user_id: string;
  id: string;
}
@Injectable()
export class PromotionDeleteService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly promotionRepository: IPromotionRepository,
  ) {}
  public async execute({
    user_id,
    id,
  }: IPromotionDeleteRequest): Promise<void> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const promotion_exists = await this.promotionRepository.findById(id);
    if (!promotion_exists) throw new AppError('Promoção não existe');
    await this.promotionRepository.delete(id);
  }
}
