/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Promotion } from '../../entities/promotion.entity';
import { IPromotionRepository } from '../abstract_class/IPromotionRepository';

@Injectable()
export class inMemoryPromotionRepository implements IPromotionRepository {
  async findByBarbershopIdAndServiceId(
    barbershop_id: string,
    service_id: string,
  ): Promise<Promotion | null> {
    const promotion = this.list_promotion.find(
      (item) =>
        item.barbershop_id === barbershop_id && item.service_id === service_id,
    );
    if (!promotion) return null;
    return promotion;
  }
  async findByBarbershopId(id: string): Promise<Promotion[]> {
    const list_promotion = this.list_promotion.filter(
      (item) => item.barbershop_id === id,
    );
    return list_promotion;
  }
  async findByServiceId(id: string): Promise<Promotion[]> {
    const list_promotion = this.list_promotion.filter(
      (item) => item.service_id === id,
    );
    return list_promotion;
  }
  public list_promotion: Promotion[] = [];

  async findByAll(): Promise<Promotion[]> {
    return this.list_promotion;
  }

  async create(data: Promotion): Promise<void> {
    this.list_promotion.push(data);
  }

  async update(data: Promotion): Promise<void> {
    const promotionIndex = this.list_promotion.findIndex(
      (item) =>
        item.barbershop_id === data.barbershop_id &&
        item.service_id === data.service_id,
    );
    if (promotionIndex >= 0) {
      this.list_promotion[promotionIndex] = data;
    }
  }

  async delete(barbershop_id: string, service_id: string): Promise<void> {
    const promotionIndex = this.list_promotion.findIndex(
      (item) =>
        item.barbershop_id === barbershop_id && item.service_id === service_id,
    );
    this.list_promotion.splice(promotionIndex, 1);
  }
}
