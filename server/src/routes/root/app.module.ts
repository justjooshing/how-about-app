import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContentfulModule } from '../../third-party/contentful/contentful.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContentfulModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
