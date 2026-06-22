// Запуск: node change-password.js <новый_пароль>
// Пример: node change-password.js MySecurePass123!

require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const newPassword = process.argv[2]

if (!newPassword || newPassword.length < 8) {
  console.error('Укажите пароль минимум 8 символов: node change-password.js <пароль>')
  process.exit(1)
}

const prisma = new PrismaClient()

async function main() {
  const hash = bcrypt.hashSync(newPassword, 12)
  const admin = await prisma.admin.update({
    where: { email: 'admin@starter.ru' },
    data: { passwordHash: hash },
  })
  console.log(`Пароль для ${admin.email} успешно изменён`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
