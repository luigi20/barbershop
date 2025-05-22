import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/service/prisma.service';
import { Member } from '../entities/member.entity';
import { PrismaMemberMapper } from '@modules/prisma/mappers/PrismaMemberMapper';
import { IMemberRepository } from './abstract_class/IMemberRepository';
import { Role } from '@prisma/client';

@Injectable()
class MemberRepository implements IMemberRepository {
  constructor(private prisma: PrismaService) {}

  async findByAllMemberBarberIds(barbershop_id: string): Promise<string[]> {
    const result_list = await this.prisma.member.findMany({
      where: {
        barbershop_id: barbershop_id,
        role: 'BARBER',
      },
      select: {
        user_id: true,
      },
    });
    return result_list.map((item) => item.user_id);
  }

  async findByAllMemberClientIds(barbershop_id: string): Promise<string[]> {
    const result_list = await this.prisma.member.findMany({
      where: {
        barbershop_id: barbershop_id,
        role: 'CLIENT',
      },
      select: {
        user_id: true,
      },
    });
    return result_list.map((item) => item.user_id);
  }

  async findByAllMemberNOTClientIds(barbershop_id: string): Promise<string[]> {
    const result_list = await this.prisma.member.findMany({
      where: {
        barbershop_id: barbershop_id,
        role: {
          not: 'CLIENT',
        },
      },
      select: {
        user_id: true,
      },
    });
    return result_list.map((item) => item.user_id);
  }
  async findByAllMemberBarbeshop(barbershop_id: string): Promise<Member[]> {
    const result_list = await this.prisma.member.findMany({
      where: {
        barbershop_id: barbershop_id,
      },
    });
    return result_list.map((item) => PrismaMemberMapper.toDomain(item));
  }

  async create(data: Member): Promise<void> {
    const raw = PrismaMemberMapper.toPrisma(data);
    await this.prisma.member.create({
      data: raw,
    });
  }
  async findById(
    user_id: string,
    barbershop_id: string,
  ): Promise<Member | null> {
    const result = await this.prisma.member.findFirst({
      where: {
        user_id: user_id,
        barbershop_id: barbershop_id,
      },
    });
    if (!result) return null;
    return PrismaMemberMapper.toDomain(result);
  }

  async findByIdRole(role: string, barbershop_id: string): Promise<Member[]> {
    const result_list = await this.prisma.member.findMany({
      where: {
        barbershop_id: barbershop_id,
        role: role as Role,
      },
    });
    return result_list.map((item) => PrismaMemberMapper.toDomain(item));
  }

  async update(data: Member): Promise<void> {
    const raw = PrismaMemberMapper.toPrisma(data);
    await this.prisma.member.update({
      where: {
        id: data.id,
      },
      data: raw,
    });
  }
  async delete(user_id: string, barbershop_id: string): Promise<void> {
    await this.prisma.member.delete({
      where: {
        barbershop_id_user_id: {
          barbershop_id: barbershop_id,
          user_id: user_id,
        },
      },
    });
  }
}

export { MemberRepository };
