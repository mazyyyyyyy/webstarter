import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  create(@Body() body: { items: any[]; totalPrice: number; name?: string; phone?: string; website?: string }) {
    if (body.website) throw new BadRequestException('Bot detected')
    if (!body.name?.trim() || !body.phone?.trim()) {
      throw new BadRequestException('Имя и телефон обязательны')
    }
    return this.ordersService.notify({ ...body, name: body.name.trim(), phone: body.phone.trim() })
  }
}
