import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common'
import { NewsService } from './news.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findAll()
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: { title: string; text: string; day: string; month: string }) {
    return this.newsService.create(body)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.newsService.update(Number(id), body)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.newsService.remove(Number(id))
  }
}
