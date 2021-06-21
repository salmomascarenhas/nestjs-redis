import { BullModule, BullQueueInject } from '@anchan828/nest-bullmq';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { createBullBoard } from 'bull-board';
import { BullMQAdapter } from 'bull-board/bullMQAdapter';
import { Queue } from 'bullmq';
import { CacheService } from './cache.service';

@Module({
  imports: [
    BullModule.forRoot({
      options: {
        connection: {
          host: 'cache',
          port: 6379,
        },
      },
    }),
    /** DI all your queues and Redis connection */
    BullModule.registerQueue('queue'),
    // BullModule.registerQueue({
    //   name: 'queue',
    //   redis: {
    //     host: 'cache',
    //     port: 6379,
    //   },
    // }),
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheModule, CacheService],
})
export class CacheModule {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private routerTest;

  constructor(
    @BullQueueInject('queue')
    private readonly queueOne: Queue,
  ) {
    /** Add queues with adapter, one-by-one */
    const { router } = createBullBoard([
      new BullMQAdapter(this.queueOne, { readOnlyMode: false }),
    ]);
    this.routerTest = router;
    // setQueues([new BullMQAdapter(this.queueOne, { readOnlyMode: false })]);
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(this.routerTest).forRoutes('/bull-board');
  }
}
