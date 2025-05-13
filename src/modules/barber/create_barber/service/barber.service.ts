import { Injectable } from '@nestjs/common';
import { CreateBarberDto } from '../dto/create-barber.dto';
import { RedisService } from 'src/infra/redis/service/redis.service';

@Injectable()
export class BarberService {
  constructor(private readonly attendanceRepository: RedisService) {}
  public execute(createBarberDto: CreateBarberDto): string {
    console.log(createBarberDto);
    return 'This action adds a new barber';
  }
}
