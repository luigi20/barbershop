import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BarberModule } from './modules/barber/barber.module';
import { RedisModule } from './infra/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    BarberModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
