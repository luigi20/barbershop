import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import bcrypt from 'bcrypt';
import { AppError } from '@utils/apperror';
@Injectable()
export class UserCreateService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute({
    email,
    name,
    password,
    role,
  }: CreateUserDto): Promise<User> {
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    const user_exists = await this.userRepository.findByEmail(email);
    if (user_exists) throw new AppError('Usuário já cadastrado com este email');
    const list_users = ['ADMIN', 'BARBER', 'CLIENT'];
    if (!list_users.includes(role))
      throw new AppError('Papel de usuário não permitido no sistema');
    const user = new User({
      email: email,
      password: hash_password,
      name: name,
    });
    await this.userRepository.create(user);
    return user;
  }
}
