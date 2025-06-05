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

  export interface PromotionRelations {
    id: string;
    barbershop_id: string;
    service_id: string;
    discount_amount: number;
    status: string;
    created_at: Date;
    updated_at: Date;
    barbershop_service?: BarbershopServiceRelations;
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

  export interface AttendanceRelations {
    id: string;
    barber_attendance_id: string;
    barbershop_id: string;
    status: Attendance_Status;
    created_at: Date;
    updated_at: Date;
    barber_attendance?: UserRelations;
    barbershop?: BarbershopRelations;
  }

  export interface BarbershopServiceRelations {
    barbershop_id: string;
    service_id: string;
    duration: number;
    price: number;
    created_at: Date;
    updated_at: Date;
  }

  export interface ServiceRelations {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
  }

  export interface MemberRelations {
    role: Role;
    barbershop_id: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    user?: UserRelations;
    barbershop?: BarbershopRelations;
  }
}
