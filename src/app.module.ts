import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infra/redis/redis.module';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { BarbershopModule } from '@modules/barbershop/barbershop.module';
import { BarberModule } from '@modules/barber/barber.module';
import { ServiceModule } from '@modules/services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    RedisModule,
    PrismaModule,
    BarbershopModule,
    BarberModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
