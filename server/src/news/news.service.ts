import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.news.findMany({ orderBy: { sortOrder: 'asc' } })
  }

  create(data: { title: string; text: string; day: string; month: string }) {
    return this.prisma.news.create({ data })
  }

  update(id: number, data: Partial<{ title: string; text: string; day: string; month: string; sortOrder: number }>) {
    return this.prisma.news.update({ where: { id }, data })
  }

  remove(id: number) {
    return this.prisma.news.delete({ where: { id } })
  }
}
