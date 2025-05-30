import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { IBarbershopServiceRepository } from './abstract_class/IBarbershopServiceRepository';
import { PrismaBarbershopServiceMapper } from '@modules/prisma/mappers/PrismaBarbershopServiceMapper';
import { Barbershop_Service } from '../entities/barbershop_services.entity';

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
  async findByServiceId(id: string): Promise<Barbershop_Service[]> {
    const result = await this.prisma.barbershopService.findMany({
      where: {
        service_id: id,
      },
    });
    return result.map((item) => PrismaBarbershopServiceMapper.toDomain(item));
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
