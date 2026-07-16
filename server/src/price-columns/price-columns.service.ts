import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PriceColumnsService {
  constructor(private prisma: PrismaService) {}

  findByService(service: string) {
    return this.prisma.priceColumn.findMany({
      where: { service },
      orderBy: { sortOrder: 'asc' },
    })
  }

  // Полностью заменяет набор столбцов услуги (delete + create в транзакции)
  async replaceForService(service: string, columns: { colKey: string; label: string }[]) {
    await this.prisma.$transaction([
      this.prisma.priceColumn.deleteMany({ where: { service } }),
      this.prisma.priceColumn.createMany({
        data: columns.map((c, i) => ({
          service,
          colKey: c.colKey,
          label: c.label,
          sortOrder: i,
        })),
      }),
    ])
    return this.findByService(service)
  }
}
