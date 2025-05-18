import { User } from '../entities/user.entity';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      //   user: barber.user ? barber.user : null,
    };
  }
}
