import { Member } from '@modules/member/shared/entities/member.entity';
import { MemberRelations as RawMember, Role } from '@prisma/client';
import { PrismaUserMapper } from './PrismaUserMapper';
import { PrismaBarbershopMapper } from './PrismaBarbershopMapper';
export class PrismaMemberMapper {
  static toPrisma(member: Member) {
    return {
      id: member.id,
      user_id: member.user_id,
      barbershop_id: member.barbershop_id,
      role: member.role as Role,
      created_at: member.created_at,
      updated_at: member.updated_at,
    };
  }

  static toDomain(raw: RawMember): Member {
    return new Member(
      {
        user_id: raw.user_id,
        barbershop_id: raw.barbershop_id,
        role: raw.role as string,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
        user: raw.user ? PrismaUserMapper.toDomain(raw.user) : null,
        barbershop: raw.barbershop
          ? PrismaBarbershopMapper.toDomain(raw.barbershop)
          : null,
      },
      raw.id,
    );
  }
}
