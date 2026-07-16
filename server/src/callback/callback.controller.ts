import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { TelegramService } from '../telegram/telegram.service'
import { CallbackDto } from './callback.dto'

@Controller('callback')
export class CallbackController {
  constructor(private readonly telegram: TelegramService) {}

  @Post()
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  async create(@Body() body: CallbackDto) {
    if (body.website) throw new BadRequestException('Bot detected')

    const text = this.telegram.formatCallback(
      body.service || 'Не указано',
      body.phone || 'Не указано',
      body.branch || 'Не указано',
    )
    await this.telegram.sendMessage(text)
    return { ok: true }
  }
}
