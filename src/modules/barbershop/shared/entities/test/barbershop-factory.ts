import { Barbershop, Barbershop_Props } from '../barbershop.entity';

type Override = Partial<Barbershop_Props>;
export function makeBarbershop(override: Override = {}) {
  return new Barbershop(
    {
      name: 'teste',
      owner_id: '123456',
      number: '223',
      city: 'rua 20',
      phone: '11992303059',
      instagram: '21212',
      street: 'ddfdfd',
      status: 'aberta',
      ...override,
    },
    '123456',
  );
}
