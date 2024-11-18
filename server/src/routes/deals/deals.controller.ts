import { Controller, Get } from '@nestjs/common';
import { DealsService } from './deals.service';
import { ApiDeals } from '@/types/api/deals';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('all')
  async getResponse(): Promise<ApiDeals | []> {
    return this.dealsService.getAllDeals();
  }
}
