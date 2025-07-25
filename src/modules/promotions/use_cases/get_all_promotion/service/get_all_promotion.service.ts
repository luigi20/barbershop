import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { Promotion } from '@modules/promotions/shared/entities/promotion.entity';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';

interface IPromotionGetAllRequest {
  user_id: string;
}

@Injectable()
export class PromotionGetAllService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly promotionRepository: IPromotionRepository,
  ) {}
  public async execute({
    user_id,
  }: IPromotionGetAllRequest): Promise<Promotion[]> {
    const user_exists = await this.userRepository.findByIdSelectId(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const list_promotion = await this.promotionRepository.findByAll();
    return list_promotion;
  }
}
