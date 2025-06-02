import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../abstract_class/IUserRepository';
import { User } from '../../entities/user.entity';
import { IdAndName } from '@utils/types';

@Injectable()
export class inMemoryUserRepository implements IUserRepository {
  public list_user: User[] = [];
  // eslint-disable-next-line @typescript-eslint/require-await
  async findByIds(ids: string[]): Promise<User[]> {
    const users = this.list_user.filter((item) => ids.includes(item.id));
    return users;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByAll(): Promise<User[]> {
    return this.list_user;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async create(data: User): Promise<void> {
    this.list_user.push(data);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async findById(id: string): Promise<User | null> {
    const user = this.list_user.find((item) => item.id === id);
    if (!user) return null;
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByIdAndName(id: string): Promise<IdAndName | null> {
    const user = this.list_user.find((item) => item.id === id);
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByIdSelectId(id: string): Promise<string | null> {
    const user = this.list_user.find((item) => item.id === id);
    if (!user) return null;
    return user.id;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByIdRole(id: string): Promise<string | null> {
    const role = this.list_user.find((item) => item.id === id);
    if (!role) return null;
    return role.id;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async update(data: User): Promise<void> {
    const userIndex = this.list_user.findIndex((item) => item.id === data.id);
    if (userIndex >= 0) {
      this.list_user[userIndex] = data;
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async delete(id: string): Promise<void> {
    const userIndex = this.list_user.findIndex((item) => item.id === id);
    this.list_user.splice(userIndex, 1);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async findByEmail(email: string): Promise<User | null> {
    const user = this.list_user.find((item) => item.email === email);
    if (!user) return null;
    return user;
  }
}
