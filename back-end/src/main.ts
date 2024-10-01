import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import cookieParser from 'cookie-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const cors = require('cors');
dotenv.config();  // Load environment variables

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../../ssl/localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../ssl/localhost.pem')),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    cors: { origin: 'https://localhost:5173', credentials: true }
  });

  app.use(cookieParser());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('money-transfer-app')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
