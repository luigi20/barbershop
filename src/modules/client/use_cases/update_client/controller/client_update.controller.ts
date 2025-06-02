import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Body, Put, Param } from '@nestjs/common';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientUpdateService } from '../service/client_update.service';

@Controller('client')
export class ClientUpdateController {
  constructor(private readonly clientUpdateService: ClientUpdateService) {}

  @Put(':id')
  async update(@Param() id: string, @Body() updateClientDto: UpdateClientDto) {
    const result = await this.clientUpdateService.execute({
      id: id,
      email: updateClientDto.email,
      name: updateClientDto.name,
      password: updateClientDto.password,
      phone: updateClientDto.phone,
      status: updateClientDto.status,
    });
    return UserViewModel.toHttp(result);
  }
}
