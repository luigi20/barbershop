import { Member, Member_Props } from '../member.entity';

type Override = Partial<Member_Props>;
export function makeMember(override: Override = {}) {
  return new Member(
    {
      barbershop_id: '123456',
      user_id: '123456',
      role: 'ADMIN',
      ...override,
    },
    '123456',
  );
}
