import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Access } from './access.entity';
import axios from 'axios';
import { hexEncode } from 'src/common/utils';
import * as crypto from 'crypto-js';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly repo: Repository<Access>,
  ) {}

  getKeys() {
    return this.repo.find({ where: { username: Not(IsNull()) } });
  }

  async getPermanentKey() {
    let key = await this.repo.findOne({ where: { username: IsNull() } });
    if (!key) {
      key = await this.generatePermamentKey();
    }
    return key.api_key;
  }

  async updatePermanentKey() {
    const keys = await this.repo.find({ where: { username: IsNull() } });
    if (keys) {
      keys.forEach(async (key) => {
        await this.repo.remove(key);
      });
    }
    const newKey = await this.generatePermamentKey();
    return newKey;
  }

  async generatePermamentKey() {
    const key = new Access();

    const ip = await axios.get('https://ifconfig.me');
    const ip64 = btoa(ip.data);
    const ipHex = hexEncode(ip64);

    const date = new Date();
    const date64 = btoa(date.valueOf().toString());
    const dateHex = hexEncode(date64);
    const dateHash = crypto.MD5(dateHex);

    key.api_key = `${ipHex}:${dateHash}:1`;
    return this.repo.save(key);
  }

  async createKey(username: string) {
    const key = new Access();

    const ip = await axios.get('https://ifconfig.me');
    const ip64 = btoa(ip.data);
    const ipHex = hexEncode(ip64);

    const date = new Date();
    const date64 = btoa(date.valueOf().toString());
    const dateHex = hexEncode(date64);
    const dateHash = crypto.MD5(dateHex);

    key.username = username.trim();
    key.api_key = `${ipHex}:${dateHash}:0`;
    console.log('crated key', key, 'for ', username);
    const res = await this.repo.save(key);
    console.log(res);
    return res;
  }

  async deleteKey(username: string, api_key: string) {
    const keys = await this.repo.find({ where: { username, api_key } });
    keys.forEach((key) => {
      this.repo.remove(key);
    });
  }
}
