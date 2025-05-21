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
    phone,
  }: IUserUpdateRequest): Promise<User> {
    const user_exists = await this.userRepository.findById(id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    user_exists.name = name;
    user_exists.password = hash_password;
    user_exists.email = email;
    user_exists.phone = phone;
    user_exists.updated_at = new Date();
    await this.userRepository.update(user_exists);
    return user_exists;
  }
}
