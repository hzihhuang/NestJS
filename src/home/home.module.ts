import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'hzihhuang', // 密钥
      signOptions: {
        expiresIn: '7d', // 设置token过期时间 「7天」
      },
    }),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule { }
