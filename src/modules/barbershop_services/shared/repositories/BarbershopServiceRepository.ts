import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { IBarbershopServiceRepository } from './abstract_class/IBarbershopServiceRepository';
import { PrismaBarbershopServiceMapper } from '@modules/prisma/mappers/PrismaBarbershopServiceMapper';
import { Barbershop_Service } from '../entities/barbershop_services.entity';
import { InfoService } from '@utils/types';

@Injectable()
class BarbershopServiceRepository implements IBarbershopServiceRepository {
  constructor(private prisma: PrismaService) {}
  async findByBarbershopId(id: string): Promise<Barbershop_Service[]> {
    const result = await this.prisma.barbershopService.findMany({
      where: {
        barbershop_id: id,
      },
    });
    return result.map((item) => PrismaBarbershopServiceMapper.toDomain(item));
  }

  async findByListBarbershopIdAndServiceIdBoolean(
    barbershop_id: string,
    service_ids: string[],
  ): Promise<boolean> {
    const count = await this.prisma.barbershopService.count({
      where: {
        barbershop_id,
        service_id: { in: service_ids },
      },
    });
    // Verifica se todos os IDs existem
    return count === service_ids.length;
  }

  async findByServiceId(id: string): Promise<Barbershop_Service[]> {
    const result = await this.prisma.barbershopService.findMany({
      where: {
        service_id: id,
      },
    });
    return result.map((item) => PrismaBarbershopServiceMapper.toDomain(item));
  }

  async findByServiceIdsPrices(
    ids: string[],
    barbershop_id: string,
  ): Promise<InfoService[]> {
    const result = await this.prisma.barbershopService.findMany({
      where: {
        service_id: {
          in: ids,
        },
        barbershop_id: barbershop_id,
      },
      select: {
        price: true,
        duration: true,
        service_id: true,
      },
    });
    return result.map((item) => item);
  }

  async findByBarbershopIdAndServiceId(
    barbershop_id: string,
    service_id: string,
  ): Promise<Barbershop_Service | null> {
    const result = await this.prisma.barbershopService.findFirst({
      where: {
        service_id: service_id,
        barbershop_id: barbershop_id,
      },
    });
    if (!result) return null;
    return PrismaBarbershopServiceMapper.toDomain(result);
  }

  async findByBarbershopIdAndServiceIdBoolean(
    barbershop_id: string,
    service_id: string,
  ): Promise<boolean | null> {
    const result = await this.prisma.barbershopService.findFirst({
      where: {
        service_id: service_id,
        barbershop_id: barbershop_id,
      },
    });
    if (!result) return null;
    return true;
  }

  async create(data: Barbershop_Service): Promise<void> {
    const raw = PrismaBarbershopServiceMapper.toPrisma(data);
    await this.prisma.barbershopService.create({
      data: raw,
    });
  }
  async findByAll(): Promise<Barbershop_Service[]> {
    const result = await this.prisma.barbershopService.findMany();
    return result.map((item) => PrismaBarbershopServiceMapper.toDomain(item));
  }
  async update(data: Barbershop_Service): Promise<void> {
    const raw = PrismaBarbershopServiceMapper.toPrisma(data);
    await this.prisma.barbershopService.update({
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
    await this.prisma.barbershopService.delete({
      where: {
        barbershop_id_service_id: {
          barbershop_id: barbershop_id,
          service_id: service_id,
        },
      },
    });
  }
}

export { BarbershopServiceRepository };
