import { Member } from '../../entities/member.entity';

abstract class IMemberRepository {
  abstract create(data: Member): Promise<void>;
  abstract findById(
    user_id: string,
    barbershop_id: string,
  ): Promise<Member | null>;
  abstract findByIdRole(role: string, barbershop_id: string): Promise<Member[]>;
  abstract findByAllMemberBarberIds(barbershop_id: string): Promise<string[]>;
  abstract findByAllMemberNOTClientIds(
    barbershop_id: string,
  ): Promise<string[]>;
  abstract findByAllMemberBarbeshop(barbershop_id: string): Promise<Member[]>;
  abstract update(data: Member): Promise<void>;
  abstract delete(user_id: string, barbershop_id: string): Promise<void>;
  abstract findByAllMemberClientIds(barbershop_id: string): Promise<string[]>;
}

export { IMemberRepository };
