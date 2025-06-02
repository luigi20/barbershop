import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { User } from '../entities/user.entity';
import { IUserRepository } from './abstract_class/IUserRepository';
import { PrismaUserMapper } from '@modules/prisma/mappers/PrismaUserMapper';
import { IdAndName } from '@utils/types';

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
    return PrismaUserMapper.toDomain(result);
  }

  async findByIdAndName(id: string): Promise<IdAndName | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!result) return null;
    const idAndName: IdAndName = {
      id: result.id,
      name: result.name,
    };
    return idAndName;
  }

  async findByIdSelectId(id: string): Promise<string | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (!result) return null;
    return result.id;
  }

  async findByIdRole(id: string): Promise<string | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        role: true,
      },
    });
    if (!result) return null;
    return result.role;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result.map((item) => PrismaUserMapper.toDomain(item));
  }

  async findByAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();

    return result.map((item) => PrismaUserMapper.toDomain(item));
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
