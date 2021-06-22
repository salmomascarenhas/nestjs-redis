import { Body, Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { CacheQueue, CacheWorker } from './shared/cache/cache.service'

@Controller()
export class AppController {
  private idJob;
  constructor(
    private readonly appService: AppService,
    private cacheQueue: CacheQueue,
    private cacheWorker: CacheWorker,
  ) {}

  @Get('/setJob')
  async setJob(@Body('titulo') title: string, @Body('valor') value: string) {
    return await this.cacheQueue.addJob(title, { data: value });
  }

  @Get('/getJobById/:jobId')
  async getJobById(@Param('jobId') jobId: number) {
    return await this.cacheQueue.getJob(jobId);
  }

  @Get('/getWaitingJobs')
  async getWaitingJobs() {
    return await this.cacheQueue.getWaiting();
  }

  @Get('/getCompletedJobs')
  async getCompletedJobs() {
    return await this.cacheQueue.getCompleted();
  }

  @Get('/getActiveJobs')
  async getActiveJobs() {
    return await this.cacheQueue.getActive();
  }

  // Nem precisa chamar, a classe CacheWorker automaticamente completa os Jobs de QUEUE conforme chegam
  @Get('/completeJob/:jobId')
  async completeJob(@Param('jobId') jobId: number) {
    return await this.cacheQueue.completeJob(jobId);
  }
}
