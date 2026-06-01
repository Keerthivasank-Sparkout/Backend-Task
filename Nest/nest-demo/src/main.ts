import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true, //stripes properties that don't have decoraors
      forbidNonWhitelisted:true,
      transform:true, // automatically transforms payload to be objects type according to dto class
      disableErrorMessages:false
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
