import { Injectable, Logger } from '@nestjs/common'
import { TelegramService } from '../telegram/telegram.service'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)

  constructor(private readonly telegram: TelegramService) {}

  async notify(order: { items: any[]; totalPrice: number; name: string; phone: string }) {
    this.logger.log(`Новый заказ от ${order.name} (${order.phone}) на ${order.totalPrice} ₽`)
    const text = this.telegram.formatOrder(order.name, order.phone, order.items, order.totalPrice)
    await this.telegram.sendMessage(text)
    return { ok: true }
  }
}
