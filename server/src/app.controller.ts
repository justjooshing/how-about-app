import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ContentfulService } from './contentful/contentful.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly contentfulService: ContentfulService,
  ) {}

  @Get()
  getDefaultResponse(): string {
    return 'Nothing to see here, try /content-types';
  }

  @Get('/content-types')
  async getContentTypes(): Promise<string[]> {
    return this.appService.getContentTypes();
  }
}
