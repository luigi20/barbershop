import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get, Param } from '@nestjs/common';
import { ClientGetService } from '../service/client_get.service';

@Controller('client')
export class ClientGetController {
  constructor(private readonly clientGetService: ClientGetService) {}

  @Get(':id')
  async get(@Param() id: string) {
    const result = await this.clientGetService.execute(id);
    return UserViewModel.toHttp(result);
  }
}
