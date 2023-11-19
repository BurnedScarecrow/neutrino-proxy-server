import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './access.entity';
import { AccessService } from './access.service';
import axios from 'axios';
import { hexDecode, hexEncode } from 'src/common/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {
  constructor() {}

  async onModuleInit() {
    const a = btoa('192.168.34.12');
    console.log('init:', atob(a));
    console.log('64:', a);

    const enc = hexEncode(a);
    console.log('hex:', enc);
    console.log('64:', hexDecode(enc));
    console.log('res:', atob(hexDecode(enc)));
    console.log('');

    const response = await axios.get('https://ifconfig.me');
    const ip = response.data;
    const ip64 = hexEncode(btoa(ip));
    console.log('IP:', atob(hexDecode(ip64)));

    const date = new Date();
    const date64 = hexEncode(btoa(date.valueOf().toString()));
    console.log(atob(hexDecode(date64)));

    console.log(`ntrn://${ip64}:${date64}:1`);
  }
}
