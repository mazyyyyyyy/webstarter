import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common'
import { PricesService } from './prices.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('prices')
export class PricesController {
  constructor(private pricesService: PricesService) {}

  @Get(':service')
  findByService(@Param('service') service: string) {
    return this.pricesService.findByService(service)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.pricesService.create(body)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.pricesService.update(Number(id), body)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pricesService.remove(Number(id))
  }
}
