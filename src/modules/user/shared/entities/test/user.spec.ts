import { User } from '../user.entity';

describe('Create User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      email: 'teste@gmail.com',
      name: 'teste',
      phone: '5511987364958',
      password: '123456',
    });
    expect(user).toBeTruthy();
  });
});
