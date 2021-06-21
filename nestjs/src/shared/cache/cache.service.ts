import { BullQueueInject } from '@anchan828/nest-bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Tedis } from 'tedis';

@Injectable()
export class CacheService {
  constructor(
    @BullQueueInject('queue')
    private readonly queue: Queue,
  ) {}

  async addJob(name: string, data: object) {
    // return this.queue.addBulk([
    //   { name: 'ob1', data: { name: 'name' } },
    //   { name: 'ob1', data: { name: 'name' } },
    //   { name: 'ob1', data: { name: 'name' } },
    // ]);
    return await this.queue.add(name, data);
  }
  async getJob(idJob) {
    return await this.queue.getJob(2);
  }

  async createJob() {
    const tedis = new Tedis({
      host: 'cache',
      port: 6379,
    });

    return await tedis.hmset('conteudo', { name: 'nome' });
  }
}
