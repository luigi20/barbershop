import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Barbershop_Service } from '@modules/barbershop_services/shared/entities/barbershop_services.entity';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';

interface IBarbershopServiceUpdateRequest {
  barbershop_id: string;
  service_id: string;
  duration: number;
  user_id: string;
  price: number;
}
@Injectable()
export class BarbershopServiceUpdateService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
    private readonly serviceRepository: IServiceRepository,
    private readonly barbershopServiceRepository: IBarbershopServiceRepository,
  ) {}
  public async execute({
    barbershop_id,
    user_id,
    service_id,
    price,
    duration,
  }: IBarbershopServiceUpdateRequest): Promise<Barbershop_Service> {
    const user_exists = await this.userRepository.findByIdAndName(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findByIdSelectIdAndNameAndOwnerId(
        barbershop_id,
      );
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    if (barbershop_exists.owner_id !== user_id)
      throw new AppError('Somente o proprietário pode alterar informações');
    const service = await this.serviceRepository.findByIdSelectId(service_id);
    if (!service) throw new AppError('Serviço não cadastrado', 404);
    const barbershop_service_exists =
      await this.barbershopServiceRepository.findByBarbershopIdAndServiceIdBoolean(
        barbershop_id,
        service_id,
      );
    if (!barbershop_service_exists)
      throw new AppError('Este serviço não existe na barbearia', 404);
    const barbershop_service = new Barbershop_Service({
      barbershop_id: barbershop_id,
      duration: duration,
      price: price,
      service_id: service_id,
    });
    await this.barbershopServiceRepository.update(barbershop_service);
    return barbershop_service;
  }
}
