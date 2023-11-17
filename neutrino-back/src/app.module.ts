import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormAsyncConfig } from './config/typeorm.config';

@Module({
  imports: [ApiModule, TypeOrmModule.forRootAsync(typeormAsyncConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly entityManager: EntityManager) {}

  async onModuleInit() {
    await this.checkDatabaseConnection();
  }

  async checkDatabaseConnection() {
    try {
      await this.entityManager.query(
        `SELECT table_schema, table_name, privilege_type
        FROM information_schema.table_privileges
        WHERE grantee = 'neutrino'; `,
      );
      console.log('Connected to the database');
      // console.log(result);
    } catch (error) {
      console.error('Failed to connect to the database', error);
    }
  }
}
