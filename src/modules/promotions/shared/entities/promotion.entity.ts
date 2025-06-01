import { Barbershop_Service } from '@modules/barbershop_services/shared/entities/barbershop_services.entity';
import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface Promotion_Props {
  service_id: string;
  barbershop_id: string;
  discount_amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  barbershop_service: Barbershop_Service | null;
}

export class Promotion {
  private _id: string;
  private props: Promotion_Props;

  constructor(
    props: Replace<
      Promotion_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        barbershop_service?: Barbershop_Service | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      barbershop_service: props.barbershop_service ?? null,
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

  public get barbershop_id(): string {
    return this.props.barbershop_id;
  }

  public set barbershop_id(barbershop_id: string) {
    this.props.barbershop_id = barbershop_id;
  }

  public get discount_amount(): number {
    return this.props.discount_amount;
  }

  public set discount_amount(discount_amount: number) {
    this.props.discount_amount = discount_amount;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
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

  public get barbershop_service(): Barbershop_Service | null {
    return this.props.barbershop_service;
  }

  public set barbershop_service(barbershop_service: Barbershop_Service) {
    this.props.barbershop_service = barbershop_service;
  }
}
