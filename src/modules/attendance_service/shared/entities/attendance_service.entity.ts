import { Attendance } from '@modules/attendance/shared/entities/attendance.entity';
import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { Barbershop_Service } from '@modules/barbershop_services/shared/entities/barbershop_services.entity';
import { User } from '@modules/user/shared/entities/user.entity';
import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface Attendance_Service_Props {
  barbershop_id: string;
  attendance_id: string;
  service_id: string;
  barbershop_name: string | null;
  barber_attendance_name: string | null;
  service_name: string | null;
  price: string | null;
  created_at: Date;
  updated_at: Date;
  service_barbershop: Barbershop_Service | null;
  attendance: Attendance | null;
}

export class Attendance_Service {
  private _id: string;
  private props: Attendance_Service_Props;

  constructor(
    props: Replace<
      Attendance_Service_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        barber_attendance?: User | null;
        barbershop?: Barbershop | null;
        barbershop_name?: string | null;
        service_barbershop?: Barbershop_Service | null;
        service_name?: string | null;
        attendance?: Attendance | null;
        price?: string | null;
        barber_attendance_name?: string | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      price: props.price ?? null,
      barber_attendance_name: props.barber_attendance_name ?? null,
      service_name: props.service_name ?? null,
      service_barbershop: props.service_barbershop ?? null,
      barbershop_name: props.barbershop_name ?? null,
      attendance: props.attendance ?? null,
    };
  }

  public get id() {
    return this._id;
  }

  public get service_id(): string {
    return this.props.service_id;
  }

  public set service_id(service_id: string) {
    this.props.service_id = service_id;
  }

  public get attendance_id(): string {
    return this.props.attendance_id;
  }

  public set attendance_id(attendance_id: string) {
    this.props.attendance_id = attendance_id;
  }

  public get barbershop_id(): string {
    return this.props.barbershop_id;
  }

  public set barbershop_id(barbershop_id: string) {
    this.props.barbershop_id = barbershop_id;
  }

  public get attendance(): Attendance | null {
    return this.props.attendance;
  }

  public set attendance(attendance: Attendance) {
    this.props.attendance = attendance;
  }

  public get barber_attendance_name(): string | null {
    return this.props.barber_attendance_name;
  }

  public set barber_attendance_name(barber_attendance_name: string) {
    this.props.barber_attendance_name = barber_attendance_name;
  }

  public get barbershop_name(): string | null {
    return this.props.barbershop_name;
  }

  public set barbershop_name(barbershop_name: string) {
    this.props.barbershop_name = barbershop_name;
  }

  public get service_name(): string | null {
    return this.props.service_name;
  }

  public set service_name(service_name: string) {
    this.props.service_name = service_name;
  }

  public get price(): string | null {
    return this.props.price;
  }

  public set price(price: string) {
    this.props.price = price;
  }

  public get service_barbershop(): Barbershop_Service | null {
    return this.props.service_barbershop;
  }

  public set service_barbershop(service_barbershop: Barbershop_Service) {
    this.props.service_barbershop = service_barbershop;
  }
  public get created_at(): Date {
    return this.props.updated_at;
  }

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get updated_at(): Date {
    return this.props.updated_at;
  }

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }
}
