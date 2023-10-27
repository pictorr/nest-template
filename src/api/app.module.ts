import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';
import { AppLoggerMiddleware } from 'src/utils/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from 'src/config/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { logger } from 'src/utils/logger';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'default',
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      dataSourceFactory: async (options: DataSourceOptions) =>
        await new DataSource(options)
          .initialize()
          .then((ds) => {
            logger.log('TypeORM connection established');
            return ds;
          })
          .catch((err) => {
            logger.error('TypeORM connection failed');
            return err;
          }),
    }),
    UserModule,
  ],
  controllers: [TestingController],
  providers: [TestingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
