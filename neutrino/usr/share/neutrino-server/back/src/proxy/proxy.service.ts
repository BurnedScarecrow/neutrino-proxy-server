import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Access } from 'src/access/access.entity';
import { getProxyConfig } from 'src/common/utils';
import { Repository } from 'typeorm';

@Injectable()
export class ProxyService {
  constructor(
    @InjectRepository(Access)
    private readonly repo: Repository<Access>,
  ) {}

  async getConfigByKey(key: string) {
    console.log(key);
    const exists = await this.repo.findOne({ where: { api_key: key } });
    console.log(exists);

    if (!exists) {
      throw new ForbiddenException();
    }
    if (key[key.length - 1] == '0' && exists.username) {
      await this.repo.remove(exists);
    }

    return getProxyConfig();
  }
}
