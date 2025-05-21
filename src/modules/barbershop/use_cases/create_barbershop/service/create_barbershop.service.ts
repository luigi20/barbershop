import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { Member } from '@modules/member/shared/entities/member.entity';

interface IBarbershopCreateRequest {
  name: string;
  owner_id: string;
  street: string;
  number: string;
  city: string;
  phone?: string;
}
@Injectable()
export class BarbershopCreateService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
    private readonly memberRepository: IMemberRepository,
  ) {}
  public async execute({
    owner_id,
    name,
    street,
    number,
    phone,
    city,
  }: IBarbershopCreateRequest): Promise<Barbershop> {
    const user_exists = await this.userRepository.findById(owner_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    // depois ver se o usuário é admin
    const barbershop = new Barbershop({
      owner_id: owner_id,
      street: street,
      number: number,
      phone: phone,
      name: name,
      city: city,
    });
    await this.barbershopRepository.create(barbershop);
    barbershop.owner_name = user_exists.name;
    const member = new Member({
      barbershop_id: barbershop.id,
      role: 'ADMIN',
      user_id: user_exists.id,
    });
    await this.memberRepository.create(member);
    return barbershop;
  }
}
