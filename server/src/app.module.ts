import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { PricesModule } from './prices/prices.module'
import { PartsModule } from './parts/parts.module'
import { CategoriesModule } from './categories/categories.module'
import { OrdersModule } from './orders/orders.module'
import { TelegramModule } from './telegram/telegram.module'
import { CallbackModule } from './callback/callback.module'
import { NewsModule } from './news/news.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 300 }]),
    TelegramModule,
    PrismaModule,
    AuthModule,
    PricesModule,
    PartsModule,
    CategoriesModule,
    OrdersModule,
    CallbackModule,
    NewsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
