import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, UseGuards,
  UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { PartsService } from './parts.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

const multerStorage = diskStorage({
  destination: (_req, _file, cb) => {
    const dir = join(__dirname, '..', '..', 'uploads')
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${extname(file.originalname)}`)
  },
})

@Controller('parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('limit') limit?: string,
  ) {
    return this.partsService.findAll(
      categoryId ? Number(categoryId) : undefined,
      limit ? Number(limit) : undefined,
    )
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: multerStorage, limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Файл не получен')
    return { path: `/uploads/${file.filename}` }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(Number(id))
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.partsService.create(body)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.partsService.update(Number(id), body)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.partsService.remove(Number(id))
  }
}
