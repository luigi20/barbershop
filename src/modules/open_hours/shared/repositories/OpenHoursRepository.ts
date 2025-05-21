import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { IOpenHoursRepository } from './abstract_class/IOpenHoursRepository';
import { Open_Hours } from '../entities/open_hours.entity';
import { PrismaOpenHoursMapper } from '@modules/prisma/mappers/PrismaOpenHoursMapper';

@Injectable()
class OpenHoursRepository implements IOpenHoursRepository {
  constructor(private prisma: PrismaService) {}
  async findByBarbershopId(barbershop_id: string): Promise<Open_Hours[]> {
    const list_open_hours = await this.prisma.open_Hours.findMany({
      where: {
        barbershop_id: barbershop_id,
      },
    });
    return list_open_hours.map((item) => PrismaOpenHoursMapper.toDomain(item));
  }

  async create(data: Open_Hours): Promise<void> {
    const raw = PrismaOpenHoursMapper.toPrisma(data);
    await this.prisma.open_Hours.create({
      data: raw,
    });
  }

  async update(data: Open_Hours): Promise<void> {
    const raw = PrismaOpenHoursMapper.toPrisma(data);
    await this.prisma.open_Hours.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.open_Hours.delete({
      where: {
        id: id,
      },
    });
  }
}
export { OpenHoursRepository };
