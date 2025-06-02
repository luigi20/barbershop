import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import bcrypt from 'bcrypt';
import { AppError } from '@utils/apperror';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { Member } from '@modules/member/shared/entities/member.entity';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';

interface IClientCreateRequest {
  email: string;
  name: string;
  password: string;
  role: string;
  phone: string;
  barbershop_id: string;
}
@Injectable()
export class ClientCreateService {
  constructor(
    private readonly clientRepository: IUserRepository,
    private readonly memberRepository: IMemberRepository,
    private readonly barbershopRepository: IBarbershopRepository,
  ) {}
  public async execute({
    email,
    name,
    password,
    role,
    phone,
    barbershop_id,
  }: IClientCreateRequest): Promise<User> {
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    const barbershop_exists =
      await this.barbershopRepository.findByIdSelectId(barbershop_id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    const user_exists = await this.clientRepository.findByEmail(email);
    if (user_exists) {
      const member_exists = await this.memberRepository.findById(
        user_exists.id,
        barbershop_id,
      );
      if (member_exists)
        throw new AppError(
          'Barbeiro já cadastrado com este email nesta barbearia',
        );
    }
    const list_users = ['CLIENT'];
    if (!list_users.includes(role))
      throw new AppError('Papel não permitido no sistema');
    const user = new User({
      email: email,
      password: hash_password,
      name: name,
      phone: phone,
      role: role,
      status: 'ativo',
    });
    await this.clientRepository.create(user);
    const member = new Member({
      barbershop_id: barbershop_id,
      role: 'CLIENT',
      user_id: user.id,
    });
    await this.memberRepository.create(member);
    return user;
  }
}
