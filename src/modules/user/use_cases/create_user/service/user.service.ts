import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '@modules/user/shared/entities/user.entity';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}
  public async execute({
    email,
    name,
    password,
  }: CreateUserDto): Promise<User> {
    const saltRounds = 12;
    const hash_password = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email: email,
      password: hash_password,
      name: name,
    });
    await this.userRepository.create(user);
    return user;
  }
}
