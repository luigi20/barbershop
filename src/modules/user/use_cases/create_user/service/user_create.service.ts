import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import bcrypt from 'bcrypt';
import { AppError } from '@utils/apperror';

interface IUserCreateRequest {
  email: string;
  name: string;
  password: string;
  role: string;
  phone: string;
}
@Injectable()
export class UserCreateService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute({
    email,
    name,
    password,
    role,
    phone,
  }: IUserCreateRequest): Promise<User> {
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    const user_exists = await this.userRepository.findByEmail(email);
    if (user_exists) throw new AppError('Usuário já cadastrado com este email');
    const list_users = ['ADMIN'];
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
    await this.userRepository.create(user);
    return user;
  }
}
