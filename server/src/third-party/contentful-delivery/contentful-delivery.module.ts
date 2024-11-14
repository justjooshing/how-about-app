import { Module } from '@nestjs/common';
import { ContentfulDeliveryService } from './contentful-delivery.service';

@Module({
  providers: [ContentfulDeliveryService],
  exports: [ContentfulDeliveryService],
})
export class ContentfulDeliveryModule {}
