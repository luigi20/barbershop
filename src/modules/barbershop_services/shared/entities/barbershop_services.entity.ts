import { Replace } from 'src/utils/replace';

export interface Barbershop_Service_Props {
  service_id: string;
  barbershop_id: string;
  service_name: string | null;
  barbershop_name: string | null;
  duration: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export class Barbershop_Service {
  private props: Barbershop_Service_Props;

  constructor(
    props: Replace<
      Barbershop_Service_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        service_name?: string | null;
        barbershop_name?: string | null;
      }
    >,
  ) {
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      service_name: props.service_name ?? null,
      barbershop_name: props.barbershop_name ?? null,
    };
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

  public get service_name(): string | null {
    return this.props.service_name;
  }

  public set service_name(service_name: string) {
    this.props.service_name = service_name;
  }

  public get barbershop_name(): string | null {
    return this.props.barbershop_name;
  }

  public set barbershop_name(barbershop_name: string) {
    this.props.barbershop_name = barbershop_name;
  }

  public get price(): number {
    return this.props.price;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get duration(): number {
    return this.props.duration;
  }

  public set duration(duration: number) {
    this.props.duration = duration;
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
