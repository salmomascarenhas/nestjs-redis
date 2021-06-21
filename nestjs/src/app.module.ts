import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store'; //uses node_redis
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ttl: 30, // seconds
      max: 10, // maximum number of items in cache
      host: 'localhost',
      port: 5379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
