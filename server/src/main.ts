import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/root/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:8081',
      'https://how-about-app-user.pages.dev',
      'https://how-about-app-venue.pages.dev',
    ],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
