import { BullModule, BullQueueInject } from '@anchan828/nest-bullmq'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { createBullBoard } from 'bull-board'
import { BullMQAdapter } from 'bull-board/bullMQAdapter'
import { Queue } from 'bullmq'
import { CacheQueue, CacheWorker } from './cache.service'

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
    BullModule.registerQueue('queue'),
  ],
  controllers: [],
  providers: [CacheQueue, CacheWorker],
  exports: [CacheQueue, CacheWorker],
})
export class CacheModule {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private routerTest;

  constructor(
    @BullQueueInject('queue')
    private readonly queue: Queue,
  ) {
    const { router } = createBullBoard([
      new BullMQAdapter(this.queue, { readOnlyMode: false }),
    ]);
    this.routerTest = router;
    // setQueues([new BullMQAdapter(this.queueOne, { readOnlyMode: false })]);
  }
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(this.routerTest).forRoutes('/bull-board');
  }
}
