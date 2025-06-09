import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';
import { IPromotionRepository } from '@modules/promotions/shared/repositories/abstract_class/IPromotionRepository';
import { Promotion } from '@modules/promotions/shared/entities/promotion.entity';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';

interface IPromotionUpdateRequest {
  barbershop_id: string;
  service_id: string;
  discount_amount: number;
  user_id: string;
  status: string;
  id: string;
}
@Injectable()
export class PromotionUpdateService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
    private readonly serviceRepository: IServiceRepository,
    private readonly barbershopServiceRepository: IBarbershopServiceRepository,
    private readonly promotionRepository: IPromotionRepository,
  ) {}
  public async execute({
    barbershop_id,
    user_id,
    service_id,
    discount_amount,
    status,
    id,
  }: IPromotionUpdateRequest): Promise<Promotion> {
    const user_exists = await this.userRepository.findByIdSelectId(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findByIdSelectIdAndNameAndOwnerId(
        barbershop_id,
      );
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    if (barbershop_exists.owner_id !== user_id)
      throw new AppError('Somente o proprietário pode alterar informações');
    const service = await this.serviceRepository.findByIdSelectId(service_id);
    if (!service) throw new AppError('Serviço não existe', 404);
    const barbershop_service_exists =
      await this.barbershopServiceRepository.findByBarbershopIdAndServiceId(
        barbershop_id,
        service_id,
      );
    if (!barbershop_service_exists)
      throw new AppError('Este serviço não existe na barbearia', 404);
    const promotion_exists = await this.promotionRepository.findBySelectId(id);
    if (!promotion_exists) throw new AppError('Promoção não existe', 404);
    const promotion = new Promotion(
      {
        barbershop_id: barbershop_id,
        discount_amount: discount_amount,
        status: status,
        service_id: service_id,
      },
      id,
    );
    await this.promotionRepository.update(promotion);
    return promotion;
  }
}
