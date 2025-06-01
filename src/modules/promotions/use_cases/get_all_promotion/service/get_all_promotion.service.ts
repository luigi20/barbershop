import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Promotion } from '@modules/promotions/shared/entities/promotion.entity';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';

interface IPromotionGetAllRequest {
  user_id: string;
  barbershop_id: string;
}

@Injectable()
export class PromotionGetAllService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly promotionRepository: IPromotionRepository,
  ) {}
  public async execute({
    user_id,
    barbershop_id,
  }: IPromotionGetAllRequest): Promise<Promotion[]> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findById(barbershop_id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    const list_promotion =
      await this.promotionRepository.findByBarbershopId(barbershop_id);
    return list_promotion;
  }
}
