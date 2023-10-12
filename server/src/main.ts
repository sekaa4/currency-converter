import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configDotEnv = app.get(ConfigService);
  const port = configDotEnv.get<number>('PORT');

  const config = new DocumentBuilder()
    .setTitle('Currency Service')
    .setDescription('Currency Converter API with CRUD functionality')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`)
    .addServer(`https://hls-lw2o.onrender.com`)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );

  app.enableCors();
  SwaggerModule.setup('doc', app, document);
  await app.listen(port || 3000);
}

bootstrap();
