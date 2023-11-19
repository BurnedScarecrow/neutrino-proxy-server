import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { ProxyConfigDto } from './dto/proxy-config.dto';

@Injectable()
export class ApiService {
  serviceName = 'shadowsocks-libev';

  getHello(): string {
    return 'Hello World! Answer from API.';
  }

  getProxyConfig() {
    const filePath = '/etc/shadowsocks-libev/config.json';
    try {
      const data = readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Ошибка при синхронном чтении файла:', err);
      throw new InternalServerErrorException(
        "Can't read file with proxy settions",
      );
    }
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

      exec(statusCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error checking service status: ${error.message}`);
          resolve('inactive');
          return;
        }

        if (stderr) {
          console.error(`Error output: ${stderr}`);
          reject(stderr);
          return;
        }

        const status = stdout.trim();

        if (status === 'active') {
          console.log(`Service ${this.serviceName} is active.`);
          resolve('active');
        } else {
          console.log(
            `Service ${this.serviceName} is not active. Current status: ${status}`,
          );
          resolve(status);
        }
      });
    });
  }

  async proxyRestart() {
    return new Promise<void>((resolve, reject) => {
      const restartCommand = `sudo systemctl restart ${this.serviceName}`;

      exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error restarting service: ${error.message}`);
          reject(error.message);
          return;
        }

        if (stderr) {
          console.error(`Error output: ${stderr}`);
          reject(stderr);
          return;
        }

        console.log(`Service ${this.serviceName} restarted successfully.`);
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

        console.log(`Service ${this.serviceName} started successfully.`);
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

        console.log(`Service ${this.serviceName} stopped successfully.`);
        resolve();
      });
    });
  }
}
