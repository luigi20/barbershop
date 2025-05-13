import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { IBarberRepository } from './abstract_class/IBarberRepository';
import { Barber } from '../entities/barber.entity';
import { PrismaBarberMapper } from '@modules/prisma/mappers/PrismaBarberMapper';

@Injectable()
class BarberRepository implements IBarberRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: Barber): Promise<void> {
    const raw = PrismaBarberMapper.toPrisma(data);
    await this.prisma.barber.create({
      data: raw,
    });
  }
  async findById(id: string): Promise<Barber | null> {
    const result = await this.prisma.barber.findFirst({
      where: {
        id: id,
      },
    });
    if (!result) return null;

    return PrismaBarberMapper.toDomain(result);
  }
  async update(data: Barber): Promise<void> {
    const raw = PrismaBarberMapper.toPrisma(data);
    await this.prisma.barber.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.barber.delete({
      where: {
        id: id,
      },
    });
  }
  async findByUserId(user_id: string): Promise<Barber | null> {
    const barber = await this.prisma.barber.findFirst({
      where: {
        user_id: user_id,
      },
    });
    if (!barber) return null;
    return PrismaBarberMapper.toDomain(barber);
  }
}

export { BarberRepository };
