import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)

  // Заглушка: пока без реального Telegram-бота, просто логируем заказ.
  // Когда бот будет готов — здесь отправка сообщения через Telegram Bot API.
  async notify(order: { items: any[]; totalPrice: number }) {
    this.logger.log(`Новый заказ на ${order.totalPrice} ₽: ${JSON.stringify(order.items)}`)
    return { ok: true }
  }
}
