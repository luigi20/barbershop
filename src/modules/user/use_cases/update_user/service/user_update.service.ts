import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import bcrypt from 'bcrypt';
import { AppError } from '@utils/apperror';

interface IUserUpdateRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
  role: string;
  status: string;
  id: string;
}

@Injectable()
export class UserUpdateService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute({
    email,
    name,
    password,
    id,
    role,
    phone,
    status,
  }: IUserUpdateRequest): Promise<User> {
    const user_exists = await this.userRepository.findByIdSelectId(id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email: email,
      password: hash_password,
      name: name,
      phone: phone,
      role: role,
      status: status,
    });
    await this.userRepository.update(user);
    return user;
  }
}
