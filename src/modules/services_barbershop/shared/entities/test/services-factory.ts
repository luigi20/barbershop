import { Service, Service_Props } from '../services.entity';

type Override = Partial<Service_Props>;
export function makeService(override: Override = {}) {
  return new Service(
    {
      name: 'teste',
      ...override,
    },
    '123456',
  );
}
