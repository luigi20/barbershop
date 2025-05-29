import { Injectable } from '@nestjs/common';
import { Service } from '@modules/services_barbershop/shared/entities/services.entity';
import { IServiceRepository } from '@modules/services_barbershop/shared/repositories/abstract_class/IServiceRepository';

@Injectable()
export class ServiceGetAllService {
  constructor(private readonly serviceRepository: IServiceRepository) {}
  public async execute(): Promise<Service[]> {
    const list_services = await this.serviceRepository.findByAll();
    return list_services;
  }
}
