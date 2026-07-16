import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common'
import { PriceColumnsService } from './price-columns.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ReplaceColumnsDto } from './price-columns.dto'

@Controller('price-columns')
export class PriceColumnsController {
  constructor(private service: PriceColumnsService) {}

  @Get(':service')
  findByService(@Param('service') service: string) {
    return this.service.findByService(service)
  }

  @Put(':service')
  @UseGuards(JwtAuthGuard)
  replace(@Param('service') service: string, @Body() body: ReplaceColumnsDto) {
    return this.service.replaceForService(service, body.columns)
  }
}
