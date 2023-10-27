import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestingService } from './testing.service';
import { ApiTags } from '@nestjs/swagger';
import { SampleDto } from './testing.models';

@ApiTags('Testing')
@Controller('testing')
export class TestingController {
  constructor(private testingService: TestingService) {}

  @Get('health-check')
  public async getHealthCheck() {
    return this.testingService.getHealthCheck();
  }

  @Post('test-sample-post')
  public async testSamplePost(@Body() body: SampleDto) {
    return body;
  }
}
