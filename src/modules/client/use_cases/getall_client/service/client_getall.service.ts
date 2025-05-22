import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';

@Injectable()
export class ClientGetAllService {
  constructor(
    private readonly barberRepository: IUserRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}
  public async execute(barbershop_id: string): Promise<User[]> {
    const list_member_client_barbershop =
      await this.memberRepository.findByAllMemberClientIds(barbershop_id);
    if (list_member_client_barbershop.length === 0) return [];
    const list_client = await this.barberRepository.findByIds(
      list_member_client_barbershop,
    );
    return list_client;
  }
}
