/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { IAttendanceServiceRepository } from '../abstract_class/IAttendanceServiceRepository';
import { Attendance_Service } from '../../entities/attendance_service.entity';

@Injectable()
export class inMemoryAttendanceServiceRepository
  implements IAttendanceServiceRepository
{
  public list_attendance_service: Attendance_Service[] = [];

  async findByAll(): Promise<Attendance_Service[]> {
    return this.list_attendance_service;
  }

  async create(data: Attendance_Service): Promise<void> {
    this.list_attendance_service.push(data);
  }

  async findById(attendance_id: string): Promise<Attendance_Service[]> {
    const attendance = this.list_attendance_service.filter(
      (item) => item.attendance_id === attendance_id,
    );
    return attendance;
  }
  async findByIdSelectId(id: string): Promise<string | null> {
    const attendance = this.list_attendance_service.find(
      (item) => item.id === id,
    );
    if (!attendance) return null;
    return attendance.id;
  }

  async update(data: Attendance_Service): Promise<void> {
    const attendanceIndex = this.list_attendance_service.findIndex(
      (item) =>
        item.attendance_id === data.attendance_id &&
        item.service_id === data.service_id,
    );
    if (attendanceIndex >= 0) {
      this.list_attendance_service[attendanceIndex] = data;
    }
  }

  async delete(service_id: string, attendance_id: string) {
    const attendanceIndex = this.list_attendance_service.findIndex(
      (item) =>
        item.service_id === service_id && item.attendance_id === attendance_id,
    );
    this.list_attendance_service.splice(attendanceIndex, 1);
  }
}
