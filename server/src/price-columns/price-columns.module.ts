import { Module } from '@nestjs/common'
import { PriceColumnsController } from './price-columns.controller'
import { PriceColumnsService } from './price-columns.service'

@Module({
  controllers: [PriceColumnsController],
  providers: [PriceColumnsService],
})
export class PriceColumnsModule {}
