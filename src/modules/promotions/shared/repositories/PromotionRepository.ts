import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { Promotion } from '../entities/promotion.entity';
import { PrismaPromotionMapper } from '@modules/prisma/mappers/PrismaPromotionMapper';
import { IPromotionRepository } from './abstract_class/IPromotionRepository';

@Injectable()
class PromotionRepository implements IPromotionRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Promotion | null> {
    const result = await this.prisma.promotions.findFirst({
      where: {
        id: id,
      },
    });
    if (!result) return null;
    return PrismaPromotionMapper.toDomain(result);
  }
  async findBySelectId(id: string): Promise<boolean | null> {
    const result = await this.prisma.promotions.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (!result) return null;
    return true;
  }
  async findByBarbershopId(id: string): Promise<Promotion[]> {
    const result = await this.prisma.promotions.findMany({
      where: {
        barbershop_id: id,
      },
    });
    return result.map((item) => PrismaPromotionMapper.toDomain(item));
  }
  async findByServiceId(id: string): Promise<Promotion[]> {
    const result = await this.prisma.promotions.findMany({
      where: {
        service_id: id,
      },
    });
    return result.map((item) => PrismaPromotionMapper.toDomain(item));
  }

  async findByBarbershopIdAndServiceId(
    barbershop_id: string,
    service_id: string,
  ): Promise<Promotion | null> {
    const result = await this.prisma.promotions.findFirst({
      where: {
        service_id: service_id,
        barbershop_id: barbershop_id,
      },
    });
    if (!result) return null;
    return PrismaPromotionMapper.toDomain(result);
  }

  async create(data: Promotion): Promise<void> {
    const raw = PrismaPromotionMapper.toPrisma(data);
    await this.prisma.promotions.create({
      data: raw,
    });
  }
  async findByAll(): Promise<Promotion[]> {
    const result = await this.prisma.promotions.findMany();
    return result.map((item) => PrismaPromotionMapper.toDomain(item));
  }
  async update(data: Promotion): Promise<void> {
    const raw = PrismaPromotionMapper.toPrisma(data);
    await this.prisma.promotions.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.promotions.delete({
      where: {
        id: id,
      },
    });
  }
}

export { PromotionRepository };
