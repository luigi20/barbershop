import { User } from '@modules/user/shared/entities/user.entity';
import { UserRelations as RawUser, Role } from '@prisma/client';
export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role as Role,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        role: raw.role,
        password: raw.password,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
