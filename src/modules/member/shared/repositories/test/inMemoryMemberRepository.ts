/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Member } from '../../entities/member.entity';
import { IMemberRepository } from '../abstract_class/IMemberRepository';

@Injectable()
export class inMemoryMemberRepository implements IMemberRepository {
  async findByAllMemberBarbeshopIds(barbershop_id: string): Promise<string[]> {
    const member_list = this.list_member.filter(
      (item) => item.barbershop_id === barbershop_id && item.role === 'BARBER',
    );
    return member_list.map((item) => item.user_id);
  }
  async findById(
    user_id: string,
    barbershop_id: string,
  ): Promise<Member | null> {
    const member = this.list_member.find(
      (item) =>
        item.barbershop_id === barbershop_id && item.user_id === user_id,
    );
    if (!member) return null;
    return member;
  }
  async findByIdRole(role: string, barbershop_id: string): Promise<Member[]> {
    const list_member = this.list_member.filter(
      (item) => item.role === role && item.barbershop_id === barbershop_id,
    );
    return list_member;
  }
  async findByAllMemberBarbeshop(barbershop_id: string): Promise<Member[]> {
    const list_member = this.list_member.filter(
      (item) => item.barbershop_id === barbershop_id,
    );
    return list_member;
  }
  public list_member: Member[] = [];

  async create(data: Member): Promise<void> {
    this.list_member.push(data);
  }

  async update(data: Member): Promise<void> {
    const memberIndex = this.list_member.findIndex(
      (item) => item.id === data.id,
    );
    if (memberIndex >= 0) {
      this.list_member[memberIndex] = data;
    }
  }

  async delete(id: string): Promise<void> {
    const memberIndex = this.list_member.findIndex((item) => item.id === id);
    this.list_member.splice(memberIndex, 1);
  }
}
