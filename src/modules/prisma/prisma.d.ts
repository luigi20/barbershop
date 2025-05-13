declare module '@prisma/client' {
  interface BarberRelations {
    id: string;
    user_id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    user?: UserRelations;
  }

  interface UserRelations {
    id: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    Barber?: UserRelations;
  }
}
