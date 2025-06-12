import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { PrismaAttendanceServiceMapper } from '@modules/prisma/mappers/PrismaAttendanceServiceMapper';
import { IAttendanceServiceRepository } from './abstract_class/IAttendanceServiceRepository';
import { Attendance_Service } from '../entities/attendance_service.entity';
import { Prisma } from '@prisma/client';

@Injectable()
class AttendanceServiceRepository implements IAttendanceServiceRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(
    data: Attendance_Service[],
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const raw = data.map((item) =>
      PrismaAttendanceServiceMapper.toPrisma(item),
    );
    const client = tx ?? this.prisma;
    await client.attendanceServices.createMany({
      data: raw,
    });
  }
  async findById(attendance_id: string): Promise<Attendance_Service[]> {
    const result = await this.prisma.attendanceServices.findMany({
      where: {
        attendance_id: attendance_id,
      },
    });
    return result.map((item) => PrismaAttendanceServiceMapper.toDomain(item));
  }
  async findByIdSelectId(attendance_id: string): Promise<string | null> {
    const result = await this.prisma.attendanceServices.findFirst({
      where: {
        attendance_id: attendance_id,
      },
      select: {
        attendance_id: true,
      },
    });
    if (!result) return null;
    return result.attendance_id;
  }

  async findByAll(): Promise<Attendance_Service[]> {
    const result = await this.prisma.attendanceServices.findMany();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(PrismaAttendanceServiceMapper.toDomain);
  }
  async update(data: Attendance_Service): Promise<void> {
    const raw = PrismaAttendanceServiceMapper.toPrisma(data);
    await this.prisma.attendanceServices.update({
      where: {
        attendance_id_service_id: {
          attendance_id: data.attendance_id,
          service_id: data.service_id,
        },
      },
      data: raw,
    });
  }
  async delete(service_id: string, attendance_id: string): Promise<void> {
    await this.prisma.attendanceServices.delete({
      where: {
        attendance_id_service_id: {
          service_id: service_id,
          attendance_id: attendance_id,
        },
      },
    });
  }
}

export { AttendanceServiceRepository };
