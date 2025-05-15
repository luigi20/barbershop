declare module '@prisma/client' {
  interface UserRelations {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    member_on?: MemberRelations[];
    organizations?: OrganizationRelations[];
  }

  interface OrganizationRelations {
    id: string;
    name: string;
    onwer: UserRelations;
    owner_id: string;
    created_at: Date;
    updated_at: Date;
    members?: MemberRelations[];
  }

  interface MemberRelations {
    id: string;
    role: string;
    organization_id: string;
    user_id: string;
    user: UserRelations;
    organization: OrganizationRelations;
  }
}
