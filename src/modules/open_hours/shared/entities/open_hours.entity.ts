import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface Open_Hours_Props {
  barbershop_id: string;
  day_week: number;
  open_time: Date;
  close_time: Date;
  created_at: Date;
  updated_at: Date;
  barbershop: Barbershop | null;
}

export class Open_Hours {
  private _id: string;
  private props: Open_Hours_Props;

  constructor(
    props: Replace<
      Open_Hours_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        barbershop?: Barbershop | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      barbershop: props.barbershop ?? null,
    };
  }

  public get id() {
    return this._id;
  }

  public get day_week(): number {
    return this.props.day_week;
  }

  public set day_week(day_week: number) {
    this.props.day_week = day_week;
  }

  public get open_time(): Date {
    return this.props.open_time;
  }

  public set open_time(open_time: Date) {
    this.props.open_time = open_time;
  }

  public get close_time(): Date {
    return this.props.close_time;
  }

  public set close_time(close_time: Date) {
    this.props.close_time = close_time;
  }

  public get barbershop(): Barbershop | null {
    return this.props.barbershop;
  }

  public set barbershop(barbershop: Barbershop) {
    this.props.barbershop = barbershop;
  }

  public get barbershop_id(): string {
    return this.props.barbershop_id;
  }

  public set barbershop_id(barbershop_id: string) {
    this.props.barbershop_id = barbershop_id;
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
