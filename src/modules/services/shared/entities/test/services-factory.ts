import { Service, Service_Props } from '../services.entity';

type Override = Partial<Service_Props>;
export function makeService(override: Override = {}, id: string = '123456') {
  return new Service(
    {
      name: 'teste',
      ...override,
    },
    id,
  );
}
