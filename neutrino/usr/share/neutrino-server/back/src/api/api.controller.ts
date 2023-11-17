import { Controller, Get, Logger } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Get()
  getHello(): string {
    Logger.debug("Called [GET] '/api/'");
    return this.appService.getHello();
  }
}
