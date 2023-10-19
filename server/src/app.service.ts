import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi, its currency-converter server, you can use next path: "/", "/currencies", "/code", "/doc"';
  }
}
