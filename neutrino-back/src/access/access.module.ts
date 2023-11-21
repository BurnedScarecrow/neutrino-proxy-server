import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './access.entity';
import { AccessService } from './access.service';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
