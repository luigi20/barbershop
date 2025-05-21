import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { BarbershopCreateService } from '../service/create_barbershop.service';
import { inMemoryMemberRepository } from '@modules/member/shared/repositories/test/inMemoryMemberRepository';
import { inMemoryOpenHoursRepository } from '@modules/open_hours/shared/repositories/test/inMemoryOpenHoursRepository';
import { CreateOpenHoursDTO } from '@modules/open_hours/shared/dto/createOpenHoursDTO';
import { makeOpenHours } from '@modules/open_hours/shared/entities/test/open-hours-factory';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  let memberRepository: inMemoryMemberRepository;
  let openHoursRepository: inMemoryOpenHoursRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
    memberRepository = new inMemoryMemberRepository();
    openHoursRepository = new inMemoryOpenHoursRepository();
  });
  it('should add Barbershop', async () => {
    userRepository.list_user.push(makeUser());
    const create_barbershop_service = new BarbershopCreateService(
      barbershopRepository,
      userRepository,
      memberRepository,
      openHoursRepository,
    );
    const list_hours: CreateOpenHoursDTO[] = [];
    list_hours.push(makeOpenHours());
    list_hours.push(makeOpenHours());
    const created_barbershop = await create_barbershop_service.execute({
      city: 'deefefef',
      list_open_hours: list_hours,
      name: 'Brutal',
      number: '3232',
      street: 'Rua das Mangabeiras',
      owner_id: '123456',
      phone: '55119302928390',
    });
    expect(barbershopRepository.list_barbershop).toHaveLength(1);
    expect(barbershopRepository.list_barbershop[0]).toEqual(created_barbershop);
  });

  it('should not add Barbershop', async () => {
    const create_barbershop_service = new BarbershopCreateService(
      barbershopRepository,
      userRepository,
      memberRepository,
      openHoursRepository,
    );
    const list_hours: CreateOpenHoursDTO[] = [];
    list_hours.push(makeOpenHours());
    list_hours.push(makeOpenHours());
    await expect(
      create_barbershop_service.execute({
        city: 'deefefef',
        list_open_hours: list_hours,
        name: 'Brutal',
        number: '3232',
        street: 'Rua das Mangabeiras',
        owner_id: '123456',
        phone: '55119302928390',
      }),
    ).rejects.toThrow('Usuário não existe');
  });
});
