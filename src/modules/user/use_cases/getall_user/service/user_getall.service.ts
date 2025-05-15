import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';

@Injectable()
export class UserGetAllService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(): Promise<User[]> {
    const list_user = await this.userRepository.findByAll();
    return list_user;
  }
}
