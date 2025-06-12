import { Prisma } from '@prisma/client';
import { Attendance } from '../../entities/attendance.entity';

abstract class IAttendanceRepository {
  abstract create(
    data: Attendance,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  abstract findById(id: string): Promise<Attendance | null>;
  abstract findByIdSelectId(id: string): Promise<string | null>;
  abstract findByAll(): Promise<Attendance[]>;
  abstract update(data: Attendance): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export { IAttendanceRepository };
