import { Injectable } from '@nestjs/common';

@Injectable()
export class TestingService {
  getHealthCheck(): string {
    return 'Hello World!';
  }
}
