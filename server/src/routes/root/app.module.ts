import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DealsModule } from '../deals/deals.module';
import { ContentfulDeliveryModule } from '@/server/src/third-party/contentful-delivery/contentful-delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContentfulDeliveryModule,
    DealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
