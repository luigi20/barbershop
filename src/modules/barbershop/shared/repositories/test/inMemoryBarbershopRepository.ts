/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Barbershop } from '../../entities/barbershop.entity';
import { IBarbershopRepository } from '../abstract_class/IBarbershopRepository';

@Injectable()
export class inMemoryBarbershopRepository implements IBarbershopRepository {
  public list_barbershop: Barbershop[] = [];

  async findByOwnerId(owner_id: string): Promise<Barbershop[]> {
    const result = this.list_barbershop.filter(
      (item) => item.owner_id === owner_id,
    );
    return result;
  }

  async findByAll(): Promise<Barbershop[]> {
    return this.list_barbershop;
  }

  async create(data: Barbershop): Promise<void> {
    this.list_barbershop.push(data);
  }

  async findById(id: string): Promise<Barbershop | null> {
    const barbershop = this.list_barbershop.find((item) => item.id === id);
    if (!barbershop) return null;
    return barbershop;
  }

  async update(data: Barbershop): Promise<void> {
    const barbershopIndex = this.list_barbershop.findIndex(
      (item) => item.id === data.id,
    );
    if (barbershopIndex >= 0) {
      this.list_barbershop[barbershopIndex] = data;
    }
  }

  async delete(id: string): Promise<void> {
    const barbershopIndex = this.list_barbershop.findIndex(
      (item) => item.id === id,
    );
    this.list_barbershop.splice(barbershopIndex, 1);
  }
}
