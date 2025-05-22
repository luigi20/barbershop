import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get, Param } from '@nestjs/common';
import { ClientGetAllService } from '../service/client_getall.service';

@Controller('client')
export class ClientGetAllController {
  constructor(private readonly clientGetAllService: ClientGetAllService) {}

  @Get(':barbershop_id')
  async get(@Param('id') barbershop_id: string) {
    const result = await this.clientGetAllService.execute(barbershop_id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(UserViewModel.toHttp);
  }
}
