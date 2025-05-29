import { Service } from '../entities/services.entity';

export class ServicesViewModel {
  static toHttp(service: Service) {
    return {
      id: service.id,
      name: service.name,
    };
  }
}
