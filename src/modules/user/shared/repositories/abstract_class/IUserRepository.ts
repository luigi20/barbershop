import { User } from '../../entities/user.entity';

abstract class IUserRepository {
  abstract create(data: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByIdRole(id: string): Promise<string | null>;
  abstract findByAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByIds(ids: string[]): Promise<User[]>;
  abstract update(data: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

export { IUserRepository };
