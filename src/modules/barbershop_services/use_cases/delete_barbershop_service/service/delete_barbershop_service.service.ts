import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';

interface IBarbershopServiceDeleteRequest {
  user_id: string;
  barbershop_id: string;
  service_id: string;
}
@Injectable()
export class BarbershopServiceDeleteService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
    private readonly barbershopServiceRepository: IBarbershopServiceRepository,
    private readonly serviceRepository: IServiceRepository,
  ) {}
  public async execute({
    user_id,
    barbershop_id,
    service_id,
  }: IBarbershopServiceDeleteRequest): Promise<void> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findById(barbershop_id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    const service_exists = await this.serviceRepository.findById(service_id);
    if (!service_exists)
      throw new AppError('Serviço não existe na barbearia', 404);
    await this.barbershopServiceRepository.delete(barbershop_id, service_id);
  }
}
