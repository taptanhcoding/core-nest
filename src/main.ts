import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.NEST_PORT || 4004
  
  const config = new DocumentBuilder()
    .setTitle('Rest API Documentation')
    .setDescription('some api test here')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useStaticAssets(join(__dirname,'..','src', 'uploads'),{
    prefix: '/uploads/'
  });

  await app.listen(PORT);
}
bootstrap();
