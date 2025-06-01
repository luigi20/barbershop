import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { Promotion } from '../entities/promotion.entity';
import { PrismaPromotionMapper } from '@modules/prisma/mappers/PrismaPromotionMapper';
import { IPromotionRepository } from './abstract_class/IPromotionRepository';

@Injectable()
class PromotionRepository implements IPromotionRepository {
  constructor(private prisma: PrismaService) {}
  async findByBarbershopId(id: string): Promise<Promotion[]> {
    const result = await this.prisma.promotion.findMany({
      where: {
        barbershop_id: id,
      },
    });
    return result.map((item) => PrismaPromotionMapper.toDomain(item));
  }
  async findByServiceId(id: string): Promise<Promotion[]> {
    const result = await this.prisma.promotion.findMany({
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
    const result = await this.prisma.promotion.findFirst({
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
    await this.prisma.promotion.create({
      data: raw,
    });
  }
  async findByAll(): Promise<Promotion[]> {
    const result = await this.prisma.promotion.findMany();
    return result.map((item) => PrismaPromotionMapper.toDomain(item));
  }
  async update(data: Promotion): Promise<void> {
    const raw = PrismaPromotionMapper.toPrisma(data);
    await this.prisma.promotion.update({
      where: {
        barbershop_id_service_id: {
          barbershop_id: raw.barbershop_id,
          service_id: raw.service_id,
        },
      },
      data: raw,
    });
  }
  async delete(barbershop_id: string, service_id: string): Promise<void> {
    await this.prisma.promotion.delete({
      where: {
        barbershop_id_service_id: {
          barbershop_id: barbershop_id,
          service_id: service_id,
        },
      },
    });
  }
}

export { PromotionRepository };
