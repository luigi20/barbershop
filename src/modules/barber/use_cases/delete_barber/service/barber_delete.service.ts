import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
@Injectable()
export class BarberDeleteService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute(id: string): Promise<void> {
    const user_exists = await this.userRepository.findByIdSelectId(id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    await this.userRepository.delete(id);
  }
}
