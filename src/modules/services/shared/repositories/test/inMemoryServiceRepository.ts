/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Service } from '../../entities/services.entity';
import { IServiceRepository } from '../abstract_class/IServiceRepository';
import { IdAndName } from '@utils/types';

@Injectable()
export class inMemoryServiceRepository implements IServiceRepository {
  async findByIdsNames(ids: string[]): Promise<string[]> {
    const services = this.list_service.filter((item) => ids.includes(item.id));
    return services.map((service) => service.name);
  }

  async findByIdGetAllAndName(): Promise<IdAndName[]> {
    const services = this.list_service.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    return services;
  }
  public list_service: Service[] = [];

  async findByAll(): Promise<Service[]> {
    return this.list_service;
  }

  async create(data: Service): Promise<void> {
    this.list_service.push(data);
  }

  async findById(id: string): Promise<Service | null> {
    const service = this.list_service.find((item) => item.id === id);
    if (!service) return null;
    return service;
  }

  async findByIdAndName(id: string): Promise<IdAndName | null> {
    const service = this.list_service.find((item) => item.id === id);
    if (!service) return null;
    return {
      id: service.id,
      name: service.name,
    };
  }
  async findByIdSelectId(id: string): Promise<string | null> {
    const service = this.list_service.find((item) => item.id === id);
    if (!service) return null;
    return service.id;
  }

  async update(data: Service): Promise<void> {
    const serviceIndex = this.list_service.findIndex(
      (item) => item.id === data.id,
    );
    if (serviceIndex >= 0) {
      this.list_service[serviceIndex] = data;
    }
  }

  async delete(id: string): Promise<void> {
    const ServiceIndex = this.list_service.findIndex((item) => item.id === id);
    this.list_service.splice(ServiceIndex, 1);
  }
}
