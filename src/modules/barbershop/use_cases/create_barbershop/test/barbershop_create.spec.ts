import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { BarbershopCreateService } from '../service/create_barbershop.service';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should add Barbershop', async () => {
    userRepository.list_user.push(makeUser());
    const create_barbershop_service = new BarbershopCreateService(
      barbershopRepository,
      userRepository,
    );
    const created_barbershop = await create_barbershop_service.execute({
      city: 'deefefef',
      name: 'Brutal',
      number: 3232,
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
    );
    await expect(
      create_barbershop_service.execute({
        city: 'deefefef',
        name: 'Brutal',
        number: 3232,
        street: 'Rua das Mangabeiras',
        owner_id: '123456',
        phone: '55119302928390',
      }),
    ).rejects.toThrow('Usuário não existe');
  });
});
