import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { Barbershop_Service } from '@modules/barbershop_services/shared/entities/barbershop_services.entity';

interface IBarbershopServiceGetRequest {
  user_id: string;
  barbershop_id: string;
}

@Injectable()
export class BarbershopServiceGetService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly barbershopServiceRepository: IBarbershopServiceRepository,
    private readonly barbershopRepository: IBarbershopRepository,
  ) {}
  public async execute({
    user_id,
    barbershop_id,
  }: IBarbershopServiceGetRequest): Promise<Barbershop_Service[]> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findById(barbershop_id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    const list_barbershop_service =
      await this.barbershopServiceRepository.findByBarbershopId(barbershop_id);
    return list_barbershop_service;
  }
}
