import { User } from '@modules/user/shared/entities/user.entity';
import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface Barbershop_Props {
  owner_id: string;
  name: string;
  street: string;
  number: string;
  status: string;
  city: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
  owner_name: string | null;
  owner: User | null;
}

export class Barbershop {
  private _id: string;
  private props: Barbershop_Props;

  constructor(
    props: Replace<
      Barbershop_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        owner?: User | null;
        owner_name?: string | null;
        phone?: string | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      owner: props.owner ?? null,
      owner_name: props.owner_name ?? null,
      phone: props.phone ?? null,
    };
  }

  public get id() {
    return this._id;
  }

  public get owner_id(): string {
    return this.props.owner_id;
  }

  public set owner_id(owner_id: string) {
    this.props.owner_id = owner_id;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get street(): string {
    return this.props.street;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get number(): string {
    return this.props.number;
  }

  public set number(number: string) {
    this.props.number = number;
  }

  public get city(): string {
    return this.props.city;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get phone(): string | null {
    return this.props.phone;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get owner_name(): string | null {
    return this.props.owner_name;
  }

  public set owner_name(owner_name: string) {
    this.props.owner_name = owner_name;
  }

  public get owner(): User | null {
    return this.props.owner;
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
