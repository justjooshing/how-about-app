import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { ContentfulDeliveryModule } from 'src/third-party/contentful-delivery/contentful-delivery.module';

@Module({
  imports: [ContentfulDeliveryModule],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
