import { makeUser } from '@modules/user/shared/entities/test/user-factory';
import { inMemoryUserRepository } from '@modules/user/shared/repositories/test/inMemoryUserRepository';
import { inMemoryBarbershopRepository } from '@modules/barbershop/shared/repositories/test/inMemoryBarbershopRepository';
import { BarbershopUpdateService } from '../service/update_barbershop.service';
import { makeBarbershop } from '@modules/barbershop/shared/entities/test/barbershop-factory';

describe('Test in setting Barbershop module', () => {
  let userRepository: inMemoryUserRepository;
  let barbershopRepository: inMemoryBarbershopRepository;
  beforeEach(() => {
    userRepository = new inMemoryUserRepository();
    barbershopRepository = new inMemoryBarbershopRepository();
  });
  it('should update Barbershop', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(makeBarbershop());
    const update_barbershop_service = new BarbershopUpdateService(
      barbershopRepository,
      userRepository,
    );
    const updated_barbershop = await update_barbershop_service.execute({
      city: 'deefefef',
      name: 'Brutal',
      number: 3232,
      street: 'Rua das Mangabeiras',
      user_id: '123456',
      phone: '55119302928390',
      id: '123456',
    });
    expect(barbershopRepository.list_barbershop).toHaveLength(1);
    expect(barbershopRepository.list_barbershop[0]).toEqual(updated_barbershop);
  });

  it('should not update Barbershop because user not exists', async () => {
    const update_barbershop_service = new BarbershopUpdateService(
      barbershopRepository,
      userRepository,
    );
    await expect(
      update_barbershop_service.execute({
        city: 'deefefef',
        name: 'Brutal',
        number: 3232,
        street: 'Rua das Mangabeiras',
        user_id: '123456',
        id: '123456',
        phone: '55119302928390',
      }),
    ).rejects.toThrow('Usuário não existe');
  });

  it('should not update Barbershop because barbershop not exists', async () => {
    userRepository.list_user.push(makeUser());
    const update_barbershop_service = new BarbershopUpdateService(
      barbershopRepository,
      userRepository,
    );
    await expect(
      update_barbershop_service.execute({
        city: 'deefefef',
        name: 'Brutal',
        number: 3232,
        street: 'Rua das Mangabeiras',
        user_id: '123456',
        id: '123456',
        phone: '55119302928390',
      }),
    ).rejects.toThrow('Barbearia não existe');
  });

  it('should not update Barbershop because you are not the owner', async () => {
    userRepository.list_user.push(makeUser());
    barbershopRepository.list_barbershop.push(
      makeBarbershop({
        owner_id: '1234',
      }),
    );
    const update_barbershop_service = new BarbershopUpdateService(
      barbershopRepository,
      userRepository,
    );
    await expect(
      update_barbershop_service.execute({
        city: 'deefefef',
        name: 'Brutal',
        number: 3232,
        street: 'Rua das Mangabeiras',
        user_id: '123456',
        id: '123456',
        phone: '55119302928390',
      }),
    ).rejects.toThrow('Somente o proprietário pode alterar informações');
  });
});
