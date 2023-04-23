import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AuthenticationInterceptor } from './app/modules/authentication/filter/authentication.interceptor';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new AuthenticationInterceptor(app.get(JwtService)),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  await app.listen(3000);
}
bootstrap();
