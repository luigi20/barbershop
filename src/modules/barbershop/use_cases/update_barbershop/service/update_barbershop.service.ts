import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';

interface IBarbershopUpdateRequest {
  id: string;
  name: string;
  user_id: string;
  street: string;
  number: number;
  city: string;
  phone?: string;
}
@Injectable()
export class BarbershopUpdateService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
  ) {}
  public async execute({
    id,
    user_id,
    name,
    street,
    number,
    phone,
    city,
  }: IBarbershopUpdateRequest): Promise<Barbershop> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists = await this.barbershopRepository.findById(id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    if (user_exists.id !== barbershop_exists.owner_id)
      throw new AppError('Somente o proprietário pode alterar informações');
    const barbershop = new Barbershop(
      {
        owner_id: user_id,
        street: street,
        number: number,
        phone: phone,
        name: name,
        city: city,
      },
      barbershop_exists.id,
    );
    await this.barbershopRepository.update(barbershop);
    barbershop.owner_name = user_exists.name;
    return barbershop;
  }
}
