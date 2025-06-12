import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { PrismaAttendanceMapper } from '@modules/prisma/mappers/PrismaAttendanceMapper';
import { IAttendanceRepository } from './abstract_class/IAttendanceRepository';
import { Attendance } from '../entities/attendance.entity';
import { Prisma } from '@prisma/client';

@Injectable()
class AttendanceRepository implements IAttendanceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Attendance, tx?: Prisma.TransactionClient): Promise<void> {
    const raw = PrismaAttendanceMapper.toPrisma(data);
    const client = tx ?? this.prisma;
    await client.attendance.create({
      data: raw,
    });
  }
  async findById(id: string): Promise<Attendance | null> {
    const result = await this.prisma.attendance.findFirst({
      where: {
        id: id,
      },
    });
    if (!result) return null;
    return PrismaAttendanceMapper.toDomain(result);
  }
  async findByIdSelectId(id: string): Promise<string | null> {
    const result = await this.prisma.attendance.findFirst({
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

  async findByAll(): Promise<Attendance[]> {
    const result = await this.prisma.attendance.findMany();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(PrismaAttendanceMapper.toDomain);
  }
  async update(data: Attendance): Promise<void> {
    const raw = PrismaAttendanceMapper.toPrisma(data);
    await this.prisma.attendance.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.attendance.delete({
      where: {
        id: id,
      },
    });
  }
}

export { AttendanceRepository };
