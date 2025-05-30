import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { Service } from '../entities/services.entity';
import { PrismaServiceMapper } from '@modules/prisma/mappers/PrismaServiceMapper';
import { IServiceRepository } from './abstract_class/IServiceRepository';

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
