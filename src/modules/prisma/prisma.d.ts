import type {
  PrismaClient as OriginalPrismaClient,
  Role,
} from '@prisma/client';
declare module '@prisma/client' {
  export { OriginalPrismaClient as PrismaClient };
  export interface UserRelations {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    member_on?: MemberRelations[];
    barbershops?: BarbershopRelations[];
  }

  export interface BarbershopRelations {
    id: string;
    name: string;
    owner_id: string;
    street: string;
    number: number;
    city: string;
    phone: string | null;
    created_at: Date;
    updated_at: Date;
    owner?: UserRelations;
    members?: MemberRelations[];
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
