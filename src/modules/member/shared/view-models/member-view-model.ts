import { Member } from '../entities/member.entity';

export class MemberViewModel {
  static toHttp(member: Member) {
    return {
      user_id: member.user_id,
      barbershop_id: member.barbershop_id,
      role: member.role,
      //   user: barber.user ? barber.user : null,
    };
  }
}
