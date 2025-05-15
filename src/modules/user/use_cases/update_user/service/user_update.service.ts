import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update_user.dto';
@Injectable()
export class UserUpdateServiceService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute({
    email,
    name,
    password,
    id,
  }: UpdateUserDto): Promise<User> {
    const user_exists = await this.userRepository.findById(id);
    if (!user_exists) throw new Error('Usuário não existe');
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    user_exists.name = name;
    user_exists.password = hash_password;
    user_exists.email = email;
    user_exists.updated_at = new Date();
    await this.userRepository.update(user_exists);
    return user_exists;
  }
}
