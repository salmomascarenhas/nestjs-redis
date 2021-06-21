import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './shared/cache.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private cacheService: CacheService,
  ) {}

  @Get()
  async getHello() {
    return this.cacheService.set('key', 'presta ai por favor!');
  }
}
