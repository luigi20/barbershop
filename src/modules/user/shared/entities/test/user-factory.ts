import { User_Props, User } from '../user.entity';

type Override = Partial<User_Props>;
export function makeUser(override: Override = {}) {
  return new User(
    {
      email: 'teste@gmail.com',
      name: 'teste',
      password: '123456',
      phone: '5511987364958',
      role: 'ADMIN',
      status: 'ativo',
      ...override,
    },
    '123456',
  );
}
