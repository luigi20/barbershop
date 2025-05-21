import { Member } from '../member.entity';

describe('Create Member', () => {
  it('should be able to create a Member', () => {
    const member = new Member({
      barbershop_id: '123456',
      user_id: '123456',
      role: 'ADMIN',
    });
    expect(member).toBeTruthy();
  });
});
