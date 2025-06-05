/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { IAttendanceRepository } from '../abstract_class/IAttendanceRepository';
import { Attendance } from '../../entities/attendance.entity';

@Injectable()
export class inMemoryAttendanceRepository implements IAttendanceRepository {
  public list_attendance: Attendance[] = [];

  async findByAll(): Promise<Attendance[]> {
    return this.list_attendance;
  }

  async create(data: Attendance): Promise<void> {
    this.list_attendance.push(data);
  }

  async findById(id: string): Promise<Attendance | null> {
    const attendance = this.list_attendance.find((item) => item.id === id);
    if (!attendance) return null;
    return attendance;
  }
  async findByIdSelectId(id: string): Promise<string | null> {
    const attendance = this.list_attendance.find((item) => item.id === id);
    if (!attendance) return null;
    return attendance.id;
  }

  async update(data: Attendance): Promise<void> {
    const attendanceIndex = this.list_attendance.findIndex(
      (item) => item.id === data.id,
    );
    if (attendanceIndex >= 0) {
      this.list_attendance[attendanceIndex] = data;
    }
  }

  async delete(id: string): Promise<void> {
    const attendanceIndex = this.list_attendance.findIndex(
      (item) => item.id === id,
    );
    this.list_attendance.splice(attendanceIndex, 1);
  }
}
