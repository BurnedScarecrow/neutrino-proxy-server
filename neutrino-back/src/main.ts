import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';

// const cert_path =
//   '/home/cawa/projects/neutrino-server/neutrino-back/selfsigned_cert.pem';
// const key_path =
//   '/home/cawa/projects/neutrino-server/neutrino-back/selfsigned_key.pem';

const cert_path = 'cert_stub';
const key_path = 'key_stub';

let httpsOptions: HttpsOptions;

try {
  httpsOptions = {
    key: readFileSync(key_path),
    cert: readFileSync(cert_path),
  };
} catch (e) {
  console.log('No SSL sertificate');
  console.log(e);
}

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();

  await httpApp.listen(4004); // Порт для HTTP
  await app.listen(4000);
}
bootstrap();
