/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Barbershop_Service } from '../../entities/barbershop_services.entity';
import { IBarbershopServiceRepository } from '../abstract_class/IBarbershopServiceRepository';

@Injectable()
export class inMemoryBarbershopServiceRepository
  implements IBarbershopServiceRepository
{
  async findByBarbershopIdAndServiceId(
    barbershop_id: string,
    service_id: string,
  ): Promise<Barbershop_Service | null> {
    const barbershop_service = this.list_barbershop_service.find(
      (item) =>
        item.barbershop_id === barbershop_id && item.service_id === service_id,
    );
    if (!barbershop_service) return null;
    return barbershop_service;
  }
  async findByBarbershopId(id: string): Promise<Barbershop_Service[]> {
    const list_barbershop_service = this.list_barbershop_service.filter(
      (item) => item.barbershop_id === id,
    );
    return list_barbershop_service;
  }
  async findByServiceId(id: string): Promise<Barbershop_Service[]> {
    const list_barbershop_service = this.list_barbershop_service.filter(
      (item) => item.service_id === id,
    );
    return list_barbershop_service;
  }
  public list_barbershop_service: Barbershop_Service[] = [];

  async findByAll(): Promise<Barbershop_Service[]> {
    return this.list_barbershop_service;
  }

  async create(data: Barbershop_Service): Promise<void> {
    this.list_barbershop_service.push(data);
  }

  async update(data: Barbershop_Service): Promise<void> {
    const barbershopServiceIndex = this.list_barbershop_service.findIndex(
      (item) =>
        item.barbershop_id === data.barbershop_id &&
        item.service_id === data.service_id,
    );
    if (barbershopServiceIndex >= 0) {
      this.list_barbershop_service[barbershopServiceIndex] = data;
    }
  }

  async delete(barbershop_id: string, service_id: string): Promise<void> {
    const barbershopServiceIndex = this.list_barbershop_service.findIndex(
      (item) =>
        item.barbershop_id === barbershop_id && item.service_id === service_id,
    );
    this.list_barbershop_service.splice(barbershopServiceIndex, 1);
  }
}
