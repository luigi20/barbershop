import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { User } from '@modules/user/shared/entities/user.entity';
import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface Attendance_Props {
  barbershop_id: string;
  barber_attendance_id: string;
  barbershop_name: string | null;
  barber_attendance_name: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
  barbershop: Barbershop | null;
  barber_attendance: User | null;
}

export class Attendance {
  private _id: string;
  private props: Attendance_Props;

  constructor(
    props: Replace<
      Attendance_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        barber_attendance?: User | null;
        barbershop?: Barbershop | null;
        barbershop_name?: string | null;
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
      barber_attendance: props.barber_attendance ?? null,
      barbershop: props.barbershop ?? null,
      barber_attendance_name: props.barber_attendance_name ?? null,
      barbershop_name: props.barbershop_name ?? null,
    };
  }

  public get id() {
    return this._id;
  }

  public get barber_attendance_id(): string {
    return this.props.barber_attendance_id;
  }

  public set barber_attendance_id(barber_attendance_id: string) {
    this.props.barber_attendance_id = barber_attendance_id;
  }

  public get barbershop_id(): string {
    return this.props.barbershop_id;
  }

  public set barbershop_id(barbershop_id: string) {
    this.props.barbershop_id = barbershop_id;
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

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get barber_attendance(): User | null {
    return this.props.barber_attendance;
  }

  public set barber_attendance(barber_attendance: User) {
    this.props.barber_attendance = barber_attendance;
  }

  public get barbershop(): Barbershop | null {
    return this.props.barbershop;
  }

  public set barbershop(barbershop: Barbershop) {
    this.props.barbershop = barbershop;
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
