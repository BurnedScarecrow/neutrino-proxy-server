import { Module } from '@nestjs/common';
import { AccessModule } from 'src/access/access.module';
import { UserModule } from 'src/user/user.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ProxyModule } from 'src/proxy/proxy.module';

@Module({
  imports: [UserModule, AccessModule, ProxyModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
