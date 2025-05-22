import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientCreateService } from '../service/client_create.service';
@Controller('client')
export class ClientCreateController {
  constructor(private readonly clientCreateService: ClientCreateService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const result = await this.clientCreateService.execute({
      email: createClientDto.email,
      name: createClientDto.name,
      password: createClientDto.password,
      role: createClientDto.role,
      phone: createClientDto.phone,
      barbershop_id: createClientDto.barbershop_id,
    });
    return UserViewModel.toHttp(result);
  }
}
