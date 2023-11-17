import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [UserModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
