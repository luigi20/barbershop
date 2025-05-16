import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { User } from '../entities/user.entity';
import { IUserRepository } from './abstract_class/IUserRepository';
import { PrismaUserMapper } from '@modules/prisma/mappers/PrismaUserMapper';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!result) return null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return PrismaUserMapper.toDomain(result);
  }
  async create(data: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(data);
    await this.prisma.user.create({
      data: raw,
    });
  }
  async findById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!result) return null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return PrismaUserMapper.toDomain(result);
  }

  async findByAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(PrismaUserMapper.toDomain);
  }
  async update(data: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(data);
    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}

export { UserRepository };
