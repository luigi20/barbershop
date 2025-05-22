import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';

@Injectable()
export class UserGetAllService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}
  public async execute(barbershop_id: string): Promise<User[]> {
    const list_member =
      await this.memberRepository.findByAllMemberNOTClientIds(barbershop_id);
    const list_user = await this.userRepository.findByIds(list_member);
    return list_user;
  }
}
