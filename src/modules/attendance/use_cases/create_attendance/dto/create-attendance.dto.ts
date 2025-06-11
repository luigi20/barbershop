import { IsArray, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  barbershop_id: string;

  @IsUUID()
  barber_attendance_id: string;

  @IsString()
  @IsIn(['ATIVO', 'FINALIZADO', 'AGENDADO', 'REAGENDADO'])
  status: string;

  @IsArray()
  @IsUUID('4', { each: true }) // ou 'all' para aceitar qualquer versão
  list_service_id: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true }) // ou 'all' para aceitar qualquer versão
  list_promotion_id: string[];
}
