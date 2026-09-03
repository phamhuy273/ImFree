import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Prefix cho API: mọi link đều có dạng /api/v1/...
  app.setGlobalPrefix('api/v1');

  // 2. Bật CORS: Cho phép Mobile hoặc Web gọi vào cổng 3000
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 3. Tự động kiểm tra dữ liệu đầu vào (DTO validation pipe)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 4. Bọc gói Response chuẩn { success, data, message } và bắt lỗi Exception
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 5. Cấu hình Swagger OpenAPI (tự tạo tài liệu API)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ImFree API Docs')
    .setDescription('Tài liệu API nền tảng ImFree (AISC 2026)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Server running on: http://localhost:${port}/api/v1`);
  logger.log(`📄 Swagger Docs: http://localhost:${port}/api/docs`);
}
bootstrap();