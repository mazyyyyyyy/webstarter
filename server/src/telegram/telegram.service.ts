import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name)
  private readonly token: string
  private readonly chatId: string

  constructor(private config: ConfigService) {
    this.token = config.get<string>('TELEGRAM_BOT_TOKEN') || ''
    this.chatId = config.get<string>('TELEGRAM_CHAT_ID') || ''
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.token || !this.chatId) {
      this.logger.warn('Telegram не настроен: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID отсутствуют')
      return
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: this.chatId, text, parse_mode: 'HTML' }),
      })
      if (!res.ok) {
        const body = await res.text()
        this.logger.error(`Telegram API ошибка: ${body}`)
      }
    } catch (err) {
      this.logger.error(`Не удалось отправить в Telegram: ${err}`)
    }
  }

  formatCallback(service: string, phone: string, branch: string): string {
    return [
      `🔧 <b>Новая заявка на звонок</b>`,
      ``,
      `📋 <b>Услуга:</b> ${this.esc(service)}`,
      `📞 <b>Телефон:</b> ${this.esc(phone)}`,
      `📍 <b>Филиал:</b> ${this.esc(branch)}`,
    ].join('\n')
  }

  formatOrder(name: string, phone: string, items: any[], totalPrice: number): string {
    const itemLines = items.map(
      (i) =>
        `  • ${this.esc(i.name)} — ${i.qty} шт. × ${Number(i.price).toLocaleString('ru-RU')} ₽ = ${(i.qty * i.price).toLocaleString('ru-RU')} ₽`,
    )
    return [
      `🛒 <b>Новый заказ из корзины</b>`,
      ``,
      `👤 <b>Клиент:</b> ${this.esc(name)}`,
      `📞 <b>Телефон:</b> ${this.esc(phone)}`,
      ``,
      `📦 <b>Товары:</b>`,
      ...itemLines,
      ``,
      `💰 <b>Итого: ${Number(totalPrice).toLocaleString('ru-RU')} ₽</b>`,
    ].join('\n')
  }

  private esc(s: string): string {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}
