import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';

@Injectable()
export class BarbershopGetService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  public async execute(user_id: string): Promise<Barbershop[]> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const list_barbershop = await this.barbershopRepository.findByOwnerId(
      user_exists.id,
    );
    return list_barbershop;
  }
}
