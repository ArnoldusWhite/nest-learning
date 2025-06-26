import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted: true,
      transform: true,
    }
    ),
  );

  /**
   * Swagger configuration
   */
    const config = new DocumentBuilder()
    .setTitle('NestJs Learning course')
    .setDescription('Use the base API URL as http://localhost:3300')
    .setTermsOfService('http://localhost:3300/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt')
      .addServer('http://localhost:3300')
    .setVersion('1.0').build();
    //Instantiate de doc object
    const  document =SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3300);
  //console.log(app);
}
bootstrap();

