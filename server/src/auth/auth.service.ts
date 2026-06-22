import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    if (!email || !password) throw new BadRequestException('Введите email и пароль')

    const admin = await this.prisma.admin.findUnique({ where: { email } })
    if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
      throw new UnauthorizedException('Неверный email или пароль')
    }

    const token = this.jwt.sign({ id: admin.id, email: admin.email })
    return { token }
  }
}
