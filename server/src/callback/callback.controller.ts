import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { TelegramService } from '../telegram/telegram.service'

@Controller('callback')
export class CallbackController {
  constructor(private readonly telegram: TelegramService) {}

  @Post()
  async create(@Body() body: { service?: string; phone?: string; branch?: string; website?: string }) {
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
