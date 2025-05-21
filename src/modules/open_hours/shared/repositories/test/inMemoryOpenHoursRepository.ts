/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { IOpenHoursRepository } from '../abstract_class/IOpenHoursRepository';
import { Open_Hours } from '../../entities/open_hours.entity';

@Injectable()
export class inMemoryOpenHoursRepository implements IOpenHoursRepository {
  public list_open_hours: Open_Hours[] = [];

  async findByBarbershopId(barbershop_id: string): Promise<Open_Hours[]> {
    const list_open_hours = this.list_open_hours.filter(
      (item) => item.barbershop_id === barbershop_id,
    );
    return list_open_hours;
  }

  async createMany(data: Open_Hours[]): Promise<void> {
    this.list_open_hours = [...this.list_open_hours, ...data];
  }

  async updateMany(data: Open_Hours[]): Promise<void> {
    this.list_open_hours = data;
  }

  async deleteMany(id: string): Promise<void> {
    const open_hoursIndex = this.list_open_hours.findIndex(
      (item) => item.id === id,
    );
    this.list_open_hours.splice(open_hoursIndex, 1);
  }
}
