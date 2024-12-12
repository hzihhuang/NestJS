import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'hzihhuang',
      resave: false, // 是否每次访问都会更新 session
      saveUninitialized: false, // 是否不管是否设置 session，都会初始化一个空的 session 对象
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
