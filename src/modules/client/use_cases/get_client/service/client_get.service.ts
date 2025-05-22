import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';

@Injectable()
export class ClientGetService {
  constructor(private readonly clientRepository: IUserRepository) {}
  public async execute(id: string): Promise<User> {
    const user_exists = await this.clientRepository.findById(id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    return user_exists;
  }
}
