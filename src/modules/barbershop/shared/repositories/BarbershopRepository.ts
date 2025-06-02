import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { IBarbershopRepository } from './abstract_class/IBarbershopRepository';
import { Barbershop } from '../entities/barbershop.entity';
import { PrismaBarbershopMapper } from '@modules/prisma/mappers/PrismaBarbershopMapper';
import { IdAndNameAndOwnerBarbershop } from '@utils/types';

@Injectable()
class BarbershopRepository implements IBarbershopRepository {
  constructor(private prisma: PrismaService) {}
  async findByOwnerId(owner_id: string): Promise<Barbershop[]> {
    const result = await this.prisma.barbershop.findMany({
      where: {
        owner_id: owner_id,
      },
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(PrismaBarbershopMapper.toDomain);
  }

  async create(data: Barbershop): Promise<void> {
    const raw = PrismaBarbershopMapper.toPrisma(data);
    await this.prisma.barbershop.create({
      data: raw,
    });
  }
  async findById(id: string): Promise<Barbershop | null> {
    const result = await this.prisma.barbershop.findFirst({
      where: {
        id: id,
      },
    });
    if (!result) return null;
    return PrismaBarbershopMapper.toDomain(result);
  }
  async findByIdSelectId(id: string): Promise<string | null> {
    const result = await this.prisma.barbershop.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (!result) return null;
    return result.id;
  }
  async findByIdSelectIdAndNameAndOwnerId(
    id: string,
  ): Promise<IdAndNameAndOwnerBarbershop | null> {
    const result = await this.prisma.barbershop.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        owner_id: true,
      },
    });
    if (!result) return null;
    const idAndNameAndOwnerBarbershop: IdAndNameAndOwnerBarbershop = {
      id: result.id,
      name: result.name,
      owner_id: result.owner_id,
    };
    return idAndNameAndOwnerBarbershop;
  }

  async findByAll(): Promise<Barbershop[]> {
    const result = await this.prisma.barbershop.findMany();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(PrismaBarbershopMapper.toDomain);
  }
  async update(data: Barbershop): Promise<void> {
    const raw = PrismaBarbershopMapper.toPrisma(data);
    await this.prisma.barbershop.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.barbershop.delete({
      where: {
        id: id,
      },
    });
  }
}

export { BarbershopRepository };
