import { Controller, Get, Param } from '@nestjs/common';
import { DealsService } from './deals.service';
import { ApiDeal, ApiDeals } from '@/shared/types/deals';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('all')
  async getAllDeals(): Promise<ApiDeals | []> {
    return this.dealsService.getAllDeals();
  }

  @Get(':dealId')
  async getSingleDeal(
    @Param() params: { dealId: string },
  ): Promise<ApiDeal | undefined> {
    return this.dealsService.getSingleDeal(params.dealId);
  }
}
