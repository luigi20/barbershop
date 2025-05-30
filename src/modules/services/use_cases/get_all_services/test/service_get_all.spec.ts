import { makeService } from '@modules/services/shared/entities/test/services-factory';
import { inMemoryServiceRepository } from '@modules/services/shared/repositories/test/inMemoryServiceRepository';
import { ServiceGetAllService } from '../service/service_get_all.service';

// Mock do método Cryptography.encrypt

describe('Test in setting user module', () => {
  let serviceGetAllRepository: inMemoryServiceRepository;
  beforeEach(() => {
    serviceGetAllRepository = new inMemoryServiceRepository();
  });
  it('should get services', async () => {
    serviceGetAllRepository.list_service.push(makeService());
    const service_get_service = new ServiceGetAllService(
      serviceGetAllRepository,
    );
    const get_all_services = await service_get_service.execute();
    expect(get_all_services).toEqual(serviceGetAllRepository.list_service);
  });
});
