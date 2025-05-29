import {
  PrismaClient as OriginalPrismaClient,
  Role,
  Status_Barbershop,
} from '@prisma/client';
declare module '@prisma/client' {
  export { OriginalPrismaClient as PrismaClient };
  export interface UserRelations {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    role: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    member_on?: MemberRelations[];
    barbershops?: BarbershopRelations[];
  }

  export interface OpenHoursRelations {
    id: string;
    barbershop_id: string;
    day_week: number;
    open_time: Date;
    close_time: Date;
    created_at: Date;
    updated_at: Date;
    barbershop?: BarbershopRelations;
  }

  export interface BarbershopRelations {
    id: string;
    name: string;
    owner_id: string;
    status: Status_Barbershop;
    street: string;
    number: string;
    city: string;
    phone: string | null;
    instagram: string | null;
    created_at: Date;
    updated_at: Date;
    owner?: UserRelations;
    members?: MemberRelations[];
    open_hours?: OpenHoursRelations[];
  }

  export interface ServiceRelations {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  }

  export interface MemberRelations {
    id: string;
    role: Role;
    barbershop_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    user?: UserRelations;
    barbershop?: BarbershopRelations;
  }
}
