import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, Headers, UnauthorizedException } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post()
  create(@Body() createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
  }

  @Get()
  findAll(@Headers('authorization') authorization: string, @Res({ passthrough: true }) response: Response) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1]
        const decoded = this.jwtService.verify(token)


        const newToken = this.jwtService.sign({ count: decoded.count + 1 })

        response.setHeader('token', newToken)
        return decoded.count + 1;
      } catch (e) {
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({ count: 1 })
      response.setHeader('token', newToken)
      return 1;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(+id, updateHomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(+id);
  }
}
