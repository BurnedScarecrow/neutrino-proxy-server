import { Body, Controller, Post } from '@nestjs/common';
import { GetProxyConfigDto } from './dto/get-proxy-config.dto';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly service: ProxyService) {}

  @Post('config')
  getConfig(@Body() dto: GetProxyConfigDto) {
    return this.service.getConfigByKey(dto.key);
  }
}
