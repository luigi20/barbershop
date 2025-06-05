import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { IBarbershopServiceRepository } from '@modules/barbershop_services/shared/repositories/abstract_class/IBarbershopServiceRepository';
import { Barbershop_Service } from '@modules/barbershop_services/shared/entities/barbershop_services.entity';
import { IServiceRepository } from '@modules/services/shared/repositories/abstract_class/IServiceRepository';

interface IBarbershopServiceGetRequest {
  user_id: string;
  barbershop_id: string;
  service_id: string;
}

@Injectable()
export class BarbershopServiceGetService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly barbershopServiceRepository: IBarbershopServiceRepository,
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly serviceRepository: IServiceRepository,
  ) {}
  public async execute({
    user_id,
    barbershop_id,
    service_id,
  }: IBarbershopServiceGetRequest): Promise<Barbershop_Service> {
    const user_exists = await this.userRepository.findByIdSelectId(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findByIdSelectIdAndNameAndOwnerId(
        barbershop_id,
      );
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    const barbershop_service =
      await this.barbershopServiceRepository.findByBarbershopIdAndServiceId(
        barbershop_id,
        service_id,
      );
    if (!barbershop_service)
      throw new AppError('Serviço da barbearia não existe', 404);
    const services = await this.serviceRepository.findByIdGetAllAndName();
    if (services.length === 0)
      throw new AppError('Serviços não cadastrados', 404);
    const match = services.find(
      (service) => service.id === barbershop_service.service_id,
    );
    if (match) {
      barbershop_service.service_name = match.name;
    }
    barbershop_service.barbershop_name = barbershop_exists.name;
    return barbershop_service;
  }
}
