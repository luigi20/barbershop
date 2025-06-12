import { Controller, Post, Body } from '@nestjs/common';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { AttendanceCreateService } from '../service/attendance_create.service';
import { AttendanceViewModel } from '@modules/attendance/shared/view-models/attendance-view-model';

@Controller('attendance')
export class AttendanceCreateController {
  constructor(
    private readonly attendanceCreateService: AttendanceCreateService,
  ) {}

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const result = await this.attendanceCreateService.execute({
      barber_attendance_id: createAttendanceDto.barber_attendance_id,
      barbershop_id: createAttendanceDto.barbershop_id,
      list_promotion_id: createAttendanceDto.list_promotion_id ?? null,
      list_service_id: createAttendanceDto.list_service_id,
      status: createAttendanceDto.status,
      user_id: 'rfrgrgr',
    });
    return AttendanceViewModel.toHttp(result);
  }
}
