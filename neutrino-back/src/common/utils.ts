import { InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'fs';

export const hexEncode = function (str) {
  let hex, i;

  let result = '';
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-2);
  }

  return result;
};

export const hexDecode = function (hex) {
  let j;
  const hexes = hex.match(/.{1,2}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

export function getProxyConfig() {
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
