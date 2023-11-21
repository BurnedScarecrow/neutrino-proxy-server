import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { getProxyConfig } from 'src/common/utils';
import { ProxyConfigDto } from './dto/proxy-config.dto';

@Injectable()
export class ApiService {
  serviceName = 'shadowsocks-libev';
  // serviceName = 'bluetooth';

  getHello(): string {
    return 'Hello World! Answer from API.';
  }

  getProxyConfig() {
    return getProxyConfig();
  }

  saveProxyConfig(dto: ProxyConfigDto) {
    const filePath = '/etc/shadowsocks-libev/config.json';
    // Синхронное чтение файла
    try {
      writeFileSync(filePath, JSON.stringify(dto));
      return dto;
    } catch (err) {
      console.error('Ошибка при синхронноq чтении файла:', err);
      throw new InternalServerErrorException(
        "Can't write file with proxy settions",
      );
    }
  }

  async proxyStatus() {
    return new Promise((resolve, reject) => {
      const statusCommand = `systemctl is-active ${this.serviceName}`;

      exec(statusCommand, (error, stdout) => {
        if (error) {
          if (error.code === 3) {
            resolve('inactive');
          } else {
            console.error(`Error executing command: ${error.message}`);
            reject('Error');
          }
        }

        resolve(stdout.trim());
      });
    });
  }

  async proxyRestart() {
    return new Promise<string | void>((resolve, reject) => {
      const restartCommand = `sudo systemctl restart ${this.serviceName}`;

      exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error restarting service: ${error.message}`);
          resolve(error.message);
          return;
        }

        if (stderr) {
          console.error(`Error output: ${stderr}`);
          reject(stderr);
          return;
        }

        if (stdout) {
          console.log(`output: ${stdout}`);
          resolve(stdout);
          return;
        }

        console.log(`Service ${this.serviceName} restarting`);
        resolve();
      });
    });
  }

  async proxyStart() {
    return new Promise<void>((resolve, reject) => {
      const restartCommand = `sudo systemctl start ${this.serviceName}`;

      exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting service: ${error.message}`);
          reject(error.message);
          return;
        }

        if (stderr) {
          console.error(`Error output: ${stderr}`);
          reject(stderr);
          return;
        }

        console.log(`Service ${this.serviceName} starting.`);
        resolve();
      });
    });
  }

  async proxyStop() {
    return new Promise<void>((resolve, reject) => {
      const restartCommand = `sudo systemctl stop ${this.serviceName}`;

      exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error terminating service: ${error.message}`);
          reject(error.message);
          return;
        }

        if (stderr) {
          console.error(`Error output: ${stderr}`);
          reject(stderr);
          return;
        }

        console.log(`Service ${this.serviceName} finishing.`);
        resolve();
      });
    });
  }
}
