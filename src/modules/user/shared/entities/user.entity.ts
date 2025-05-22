import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface User_Props {
  password: string;
  email: string;
  name: string;
  role: string;
  status: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export class User {
  private _id: string;
  private props: User_Props;

  constructor(
    props: Replace<
      User_Props,
      {
        created_at?: Date;
        updated_at?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get role(): string {
    return this.props.role;
  }

  public set role(role: string) {
    this.props.role = role;
  }

  public get phone(): string {
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

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
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
