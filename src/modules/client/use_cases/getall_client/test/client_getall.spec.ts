import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryMemberRepository } from '@modules/member/shared/repositories/test/inMemoryMemberRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeMember } from '@modules/member/shared/entities/test/member-factory';
import { User } from '@modules/user/shared/entities/user.entity';
import { ClientGetAllService } from '../service/client_getall.service';

// Mock do método Cryptography.encrypt

describe('Test in setting client module', () => {
  let userRepository: inMemoryUserRepository;
  let memberRepository: inMemoryMemberRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    memberRepository = new inMemoryMemberRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should get all clients in barbershop', async () => {
    userRepository.list_user.push(
      makeUser({
        role: 'ADMIN',
      }),
    );
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: userRepository.list_user[0].id,
      }),
    );
    const user = new User(
      {
        email: 'teste@gmail.com',
        name: 'teste',
        password: '123456',
        phone: '5511987364958',
        role: 'CLIENT',
        status: 'ativo',
      },
      '123',
    );
    userRepository.list_user.push(user);
    memberRepository.list_member.push(
      makeMember({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        role: 'ADMIN',
      }),
    );
    memberRepository.list_member.push(
      makeMember({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        role: 'CLIENT',
      }),
    );
    const client_getall_service = new ClientGetAllService(
      userRepository,
      memberRepository,
    );
    const getall_client = await client_getall_service.execute(
      barbershopRepository.list_barbershop[0].id,
    );
    expect(getall_client.length).toEqual(1);
  });
});
