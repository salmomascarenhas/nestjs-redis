import {
  CacheModule as BaseCacheModule,
  CACHE_MANAGER,
  Inject,
  Module,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store'; //uses node_redis
import { CacheService } from './cache.service';

@Module({
  imports: [
    BaseCacheModule.register({
      store: redisStore,
      ttl: 30, // seconds
      max: 10, // maximum number of items in cache
      host: 'localhost',
      port: 5379,
    }),
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheModule, CacheService],
})
export class CacheModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
}
