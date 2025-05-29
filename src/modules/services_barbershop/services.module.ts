import { Module } from '@nestjs/common';
import { ServiceGetAllController } from './use_cases/get_all_services/controller/service_get_all.controller';
import { ServiceGetAllService } from './use_cases/get_all_services/service/service_get_all.service';
import { IServiceRepository } from './shared/repositories/abstract_class/IServiceRepository';
import { ServiceRepository } from './shared/repositories/ServiceRepository';

@Module({
  controllers: [ServiceGetAllController],
  providers: [
    ServiceGetAllService,
    {
      provide: IServiceRepository,
      useClass: ServiceRepository,
    },
  ],
})
export class ServiceModule {}
