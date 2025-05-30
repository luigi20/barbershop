import { randomUUID } from 'crypto';
import {
  Barbershop_Service,
  Barbershop_Service_Props,
} from '../barbershop_services.entity';
type Override = Partial<Barbershop_Service_Props>;
export function makeBarbershopService(override: Override = {}) {
  return new Barbershop_Service({
    barbershop_id: randomUUID(),
    service_id: randomUUID(),
    duration: 30,
    price: 30.5,
    ...override,
  });
}
