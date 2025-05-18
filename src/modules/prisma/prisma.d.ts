import type { PrismaClient as OriginalPrismaClient } from '@prisma/client';
declare module '@prisma/client' {
  export { OriginalPrismaClient as PrismaClient };
  export interface UserRelations {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    member_on?: MemberRelations[];
    organizations?: OrganizationRelations[];
  }

  export interface BarbershopRelations {
    id: string;
    name: string;
    owner_id: string;
    created_at: Date;
    updated_at: Date;
    onwer?: UserRelations;
    members?: MemberRelations[];
  }

  export interface MemberRelations {
    id: string;
    role: string;
    organization_id: string;
    user_id: string;
    user: UserRelations;
    organization: OrganizationRelations;
  }
}
