import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeormAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'neutrino',
      password: 'neutrino',
      database: 'neutrino_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      //   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      // use cert in db connection only on prod.
      synchronize: false,
    };
  },
};
