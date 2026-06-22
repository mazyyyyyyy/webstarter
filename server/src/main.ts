import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' })
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' })
  app.setGlobalPrefix('api')

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`API запущен на http://localhost:${port}`)
}

bootstrap()
