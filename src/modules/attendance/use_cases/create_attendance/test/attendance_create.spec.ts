/*import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { BarberCreateService } from '../service/barber_create.service';
import { inMemoryMemberRepository } from '@modules/member/shared/repositories/test/inMemoryMemberRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';
import { makeMember } from '@modules/member/shared/entities/test/member-factory';

// Mock do método Cryptography.encrypt

describe('Test in setting barber module', () => {
  let userRepository: inMemoryUserRepository;
  let memberRepository: inMemoryMemberRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    memberRepository = new inMemoryMemberRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should add barber', async () => {
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
    const barber_user_service = new BarberCreateService(
      userRepository,
      memberRepository,
      barbershopRepository,
    );
    const barber_user = await barber_user_service.execute({
      email: 'teste2@gmail.com',
      name: 'Luis',
      password: '123456',
      phone: '5511988275940',
      barbershop_id: barbershopRepository.list_barbershop[0].id,
    });
    expect(userRepository.list_user).toHaveLength(2);
    expect(userRepository.list_user[1]).toEqual(barber_user);
  });

  it('should not add barber because barbershop not exists', async () => {
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
    const barber_user_service = new BarberCreateService(
      userRepository,
      memberRepository,
      barbershopRepository,
    );
    await expect(
      barber_user_service.execute({
        email: 'teste@gmail.com',
        name: 'Luis',
        password: '123456',
        barbershop_id: '123',
        phone: '5511988275940',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });

  it('should not add a barber because a barber already exists in the barber shop ', async () => {
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
    memberRepository.list_member.push(
      makeMember({
        barbershop_id: barbershopRepository.list_barbershop[0].id,
        user_id: userRepository.list_user[0].id,
        role: 'BARBER',
      }),
    );
    const barber_user_service = new BarberCreateService(
      userRepository,
      memberRepository,
      barbershopRepository,
    );
    await expect(
      barber_user_service.execute({
        email: 'teste@gmail.com',
        name: 'Luis',
        password: '123456',
        barbershop_id: '123456',
        phone: '5511988275940',
      }),
    ).rejects.toThrow('Barbeiro já cadastrado com este email nesta barbearia');
  });
});
*/
