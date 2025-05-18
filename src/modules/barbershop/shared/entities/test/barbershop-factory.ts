import { Barbershop, Barbershop_Props } from '../barbershop.entity';

type Override = Partial<Barbershop_Props>;
export function makeBarbershop(override: Override = {}) {
  return new Barbershop(
    {
      name: 'teste',
      owner_id: '123456',
      ...override,
    },
    '123456',
  );
}
