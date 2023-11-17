import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ApiService } from './api.service';
import { AuthDto } from './dto/auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ProxyConfigDto } from './dto/proxy-config.dto';

@Controller('api')
export class ApiController {
  constructor(
    private readonly appService: ApiService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    Logger.debug("Called [GET] '/api/'");
    return this.appService.getHello();
  }

  @Post('auth')
  async auth(@Body() dto: AuthDto) {
    Logger.debug("Called [POST] '/api/auth'");

    if (dto.username && dto.password) {
      const admin = await this.userService.getAdmin(dto.username, dto.password);

      if (!admin) {
        throw new ForbiddenException('Bad username or password');
      }
      return admin;
    }
    throw new BadRequestException('Enter username and password');
  }

  @Put('change-password')
  async changePassword(@Body() dto: ChangePasswordDto) {
    Logger.debug("Called [POST] '/api/change-password'");

    if (dto.username && dto.password.trim() !== '') {
      const admin = await this.userService.changePassword(
        dto.username,
        dto.password,
      );

      if (!admin.affected) {
        throw new ForbiddenException('Bad username or password');
      }
      return;
    }
    console.log(dto);
    throw new BadRequestException('Enter username and password');
  }

  /* -------------------------------------------------------------------------- */

  @Get('config')
  async getProxyConfig() {
    let proxyConfig = {
      password: 'A55445544a',
      port: 80,
      method: 'chacha-ietf-poly1305',
      mode: 'tcp_and_udp',
    };

    proxyConfig = this.appService.getProxyConfig();
    return proxyConfig;
  }

  @Post('config')
  async saveProxyConfig(@Body() dto: ProxyConfigDto) {
    return this.appService.saveProxyConfig(dto);
  }

  /* -------------------------------------------------------------------------- */

  @Post('restart')
  async proxyRestart() {
    await this.appService.proxyRestart();
    return this.appService.proxyStatus();
  }

  @Post('start')
  async proxyStart() {
    await this.appService.proxyStart();
    return this.appService.proxyStatus();
  }

  @Post('stop')
  async proxyStop() {
    await this.appService.proxyStop();
    return this.appService.proxyStatus();
  }

  @Get('status')
  async proxyStatus() {
    return this.appService.proxyStatus();
  }
}
