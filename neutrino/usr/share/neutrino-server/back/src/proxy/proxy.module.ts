import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/access/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  providers: [ProxyService],
  controllers: [ProxyController],
  exports: [],
})
export class ProxyModule {}
