import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/root/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:8081'] });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
