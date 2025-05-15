import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
@Injectable()
export class UserDeleteService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(id: string): Promise<void> {
    const user_exists = await this.userRepository.findById(id);
    if (!user_exists) throw new Error('Usuário não existe');
    await this.userRepository.delete(id);
  }
}
