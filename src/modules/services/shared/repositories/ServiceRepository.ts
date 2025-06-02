import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { Service } from '../entities/services.entity';
import { PrismaServiceMapper } from '@modules/prisma/mappers/PrismaServiceMapper';
import { IServiceRepository } from './abstract_class/IServiceRepository';
import { IdAndName } from '@utils/types';

@Injectable()
class ServiceRepository implements IServiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Service): Promise<void> {
    const raw = PrismaServiceMapper.toPrisma(data);
    await this.prisma.services.create({
      data: raw,
    });
  }
  async findById(id: string): Promise<Service | null> {
    const result = await this.prisma.services.findFirst({
      where: {
        id: id,
      },
    });
    if (!result) return null;
    return PrismaServiceMapper.toDomain(result);
  }

  async findByIdAndName(id: string): Promise<IdAndName | null> {
    const result = await this.prisma.barbershop.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!result) return null;
    return result;
  }
  async findByIdGetAllAndName(): Promise<IdAndName[]> {
    const result = await this.prisma.barbershop.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return result;
  }

  async findByIdSelectId(id: string): Promise<string | null> {
    const result = await this.prisma.barbershop.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!result) return null;
    return result.id;
  }

  async findByAll(): Promise<Service[]> {
    const result = await this.prisma.services.findMany();

    return result.map((item) => PrismaServiceMapper.toDomain(item));
  }
  async update(data: Service): Promise<void> {
    const raw = PrismaServiceMapper.toPrisma(data);
    await this.prisma.services.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.services.delete({
      where: {
        id: id,
      },
    });
  }
}

export { ServiceRepository };
