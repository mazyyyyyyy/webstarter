import { Controller, Post, Body } from '@nestjs/common'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() body: { items: any[]; totalPrice: number }) {
    return this.ordersService.notify(body)
  }
}
