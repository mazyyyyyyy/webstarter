import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  findByService(service: string) {
    return this.prisma.priceRow.findMany({
      where: { service },
      orderBy: [{ tableType: 'asc' }, { sortOrder: 'asc' }],
    })
  }

  create(data: any) {
    return this.prisma.priceRow.create({ data })
  }

  update(id: number, data: any) {
    return this.prisma.priceRow.update({ where: { id }, data })
  }

  remove(id: number) {
    return this.prisma.priceRow.delete({ where: { id } })
  }
}
