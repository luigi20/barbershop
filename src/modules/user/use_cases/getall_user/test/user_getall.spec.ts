import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { UserGetAllService } from '../service/user_getall.service';
import { inMemoryMemberRepository } from '@modules/member/shared/repositories/test/inMemoryMemberRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { makeMember } from '@modules/member/shared/entities/test/member-factory';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let userRepository: inMemoryUserRepository;
  let memberRepository: inMemoryMemberRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    memberRepository = new inMemoryMemberRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should get all user', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    memberRepository.list_member.push(
      makeMember({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
      }),
    );
    const user_getall_service = new UserGetAllService(
      userRepository,
      memberRepository,
    );
    const getall_user = await user_getall_service.execute(
      barbershopRepository.list_barbershop[0].id,
    );
    expect(getall_user.length).toEqual(1);
  });
});
