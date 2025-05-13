import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface Barber_Props {
  user_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class Barber {
  private _id: string;
  private props: Barber_Props;

  constructor(
    props: Replace<
      Barber_Props,
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

  public get user_id(): string {
    return this.props.user_id;
  }

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }
  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
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
