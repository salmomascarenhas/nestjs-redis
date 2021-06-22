import { BullQueueInject, BullWorker, BullWorkerProcess } from '@anchan828/nest-bullmq'
import { Injectable } from '@nestjs/common'
import { Job } from 'bull'
import { Queue, Worker } from 'bullmq'
import { Tedis } from 'tedis'

@Injectable()
export class CacheQueue {
  private routerTest;
  private readonly token = 'xxxx'
  
  constructor(
    @BullQueueInject('queue')
    private readonly queue: Queue,
  ) {}

  async addJob(name: string, data: object) {
    return await this.queue.add(name, data);
  }

  async getWaiting() {
    return await this.queue.getWaiting();
  }

  async getActive() {
    return await this.queue.getActive();
  }

  async getCompleted() {
    return await this.queue.getCompleted();
  }
  
  async getJob(jobId) {
    return await this.queue.getJob(jobId);
  }

  // Seria +- assim no Bull padrão, mas sem nem chamar o método a classe de baixo termina as Jobs
  async completeJob(jobId) {
    const worker = new Worker('queue')
    const job = (await worker.getNextJob(this.token));
    const completed = await job.moveToCompleted('sucesso', this.token);
    worker.close()
    return completed
  }

  async createJob() {
    const tedis = new Tedis({
      host: 'cache',
      port: 6379,
    });

    return await tedis.hmset('conteudo', { name: 'nome' });
  }
}

// Chamado automaticamente sempre que um Job em QUEUE é criado. Processa algo e o retorno é adicionado em returnValues do job
@BullWorker({ queueName: 'queue' })
export class CacheWorker {
  @BullWorkerProcess()
  public async process(job: Job): Promise<{ status: string, path: string }> {
    return { status: "ok", path: 'LOCAL DO ARQUIVO APOS EDIÇÃO' };
  }
}
