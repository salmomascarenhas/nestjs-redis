import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './shared/cache/cache.service';

@Controller()
export class AppController {
  private idJob;
  constructor(
    private readonly appService: AppService,
    private cacheService: CacheService,
  ) {}

  @Get('/setJob')
  async setJob() {
    return await this.cacheService.addJob('Titulo', { data: 'data' });
    // return this.idJob;
    // return this.cacheService.createJob();
  }
  @Get('/getJobs')
  async getJobs() {
    const job = await this.cacheService.getJob(this.idJob);

    // return await job.moveToCompleted();
  }
}
