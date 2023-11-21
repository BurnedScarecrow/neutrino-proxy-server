import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  getMD5Hash(data: string): string {
    const hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
  }

  getAdmin(user_name: string, password: string): Promise<User> {
    return this.repo.findOne({
      where: { user_name, password: this.getMD5Hash(password) },
    });
  }

  changePassword(user_name: string, password: string) {
    return this.repo.update(
      { user_name },
      { password: this.getMD5Hash(password) },
    );
  }
}
