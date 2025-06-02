import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';

@Injectable()
export class BarbershopDeleteService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  public async execute(user_id: string, id: string): Promise<void> {
    const user_exists = await this.userRepository.findByIdSelectId(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists =
      await this.barbershopRepository.findByIdSelectId(id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    await this.barbershopRepository.delete(id);
  }
}
