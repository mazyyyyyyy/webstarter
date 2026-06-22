import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { PricesModule } from './prices/prices.module'
import { PartsModule } from './parts/parts.module'
import { CategoriesModule } from './categories/categories.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PricesModule,
    PartsModule,
    CategoriesModule,
    OrdersModule,
  ],
})
export class AppModule {}
