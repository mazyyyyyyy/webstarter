import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  findAll(categoryId?: number, limit?: number) {
    return this.prisma.part.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: { sortOrder: 'asc' },
      take: limit,
      include: { category: true },
    })
  }

  async findOne(id: number) {
    const part = await this.prisma.part.findUnique({ where: { id } })
    if (!part) throw new NotFoundException('Не найдено')
    return part
  }

  create(data: any) {
    const { id, createdAt, updatedAt, category, ...rest } = data
    return this.prisma.part.create({ data: rest })
  }

  update(id: number, data: any) {
    const { id: _id, createdAt, updatedAt, category, ...rest } = data
    return this.prisma.part.update({ where: { id }, data: rest })
  }

  remove(id: number) {
    return this.prisma.part.delete({ where: { id } })
  }
}
