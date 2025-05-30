import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { User } from '@modules/user/shared/entities/user.entity';
import { Replace } from 'src/utils/replace';

export interface Member_Props {
  role: string;
  barbershop_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user: User | null;
  barbershop: Barbershop | null;
}

export class Member {
  private props: Member_Props;

  constructor(
    props: Replace<
      Member_Props,
      {
        created_at?: Date;
        updated_at?: Date;
        user?: User | null;
        barbershop?: Barbershop | null;
      }
    >,
  ) {
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
      user: props.user ?? null,
      barbershop: props.barbershop ?? null,
    };
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  public get role(): string {
    return this.props.role;
  }

  public set role(role: string) {
    this.props.role = role;
  }

  public get user(): User | null {
    return this.props.user;
  }

  public set user(user: User) {
    this.props.user = user;
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
