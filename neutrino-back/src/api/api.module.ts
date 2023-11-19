import { Module } from '@nestjs/common';
import { AccessModule } from 'src/access/access.module';
import { UserModule } from 'src/user/user.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [UserModule, AccessModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
