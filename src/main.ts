import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Test Boilerplate API')
        .setDescription('API documentation for Test Boilerplate application')
        .setVersion('1.0')
        .addTag('posts', 'Post management endpoints')
        .addTag('comments', 'Comment management endpoints')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger documentation: ${await app.getUrl()}/docs`);
}
bootstrap();
