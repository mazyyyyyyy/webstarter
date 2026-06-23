import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name)

  // Заглушка: пока без реального Telegram-бота, просто логируем заказ.
  // Когда бот будет готов — здесь отправка сообщения через Telegram Bot API.
  async notify(order: { items: any[]; totalPrice: number; name: string; phone: string }) {
    this.logger.log(
      `Новый заказ от ${order.name} (${order.phone}) на ${order.totalPrice} ₽: ${JSON.stringify(order.items)}`,
    )
    return { ok: true }
  }
}
