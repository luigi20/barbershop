import { User } from '../entities/user.entity';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      created_at: user.created_at,
      updated_at: user.updated_at,
      //   user: barber.user ? barber.user : null,
    };
  }
}
