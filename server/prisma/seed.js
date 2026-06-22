const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const MAIN_ROWS = [
  { col0: 'Проверка стартера на стенде',                         col1: '—', col2: 'Бесплатно*',  col3: 'Бесплатно*',    col4: 'Бесплатно',     col5: 'Бесплатно' },
  { col0: 'Проверка генератора на стенде',                       col1: '—', col2: 'Бесплатно',   col3: 'Бесплатно',     col4: 'Бесплатно',     col5: 'Бесплатно' },
  { col0: 'Диагностика стартера снятого с разборкой без сборки', col1: '—', col2: '300 ₽',       col3: '300 ₽',         col4: '300 ₽',         col5: '300 ₽' },
  { col0: 'Разборка/сборка стартера** (прямой/редукторный)',     col1: '—', col2: 'от 1 200 ₽',  col3: 'от 1 200 ₽',   col4: 'от 1 200 ₽',   col5: 'от 1 200 ₽' },
  { col0: 'Разборка/сборка стартера',                            col1: '—', col2: 'от 960 ₽',    col3: '1 200/1 440 ₽', col4: '1 200/1 440 ₽', col5: '—' },
]

const VAZ_ROWS = [
  { col0: 'ВАЗ-2101-2107', col1: 'Стартер',                           col2: 'от 960 ₽' },
  { col0: '',              col1: 'Стартер с защитой, снимается снизу', col2: '1 200/1 440 ₽' },
  { col0: '',              col1: 'Генератор, снимается снизу',         col2: '1 200/1 440 ₽' },
]

const DEFAULT_CATEGORIES = [
  { name: 'Стартеры',      sortOrder: 0 },
  { name: 'Диодные мосты', sortOrder: 1 },
  { name: 'Генераторы',    sortOrder: 2 },
  { name: 'Бендиксы',      sortOrder: 3 },
]

async function main() {
  // Admin user
  const hash = bcrypt.hashSync('admin123', 10)
  await prisma.admin.upsert({
    where:  { email: 'admin@starter.ru' },
    update: {},
    create: { email: 'admin@starter.ru', passwordHash: hash },
  })
  console.log('Создан админ: admin@starter.ru / admin123')

  // Default categories (only if none exist)
  const catCount = await prisma.category.count()
  if (catCount === 0) {
    for (const cat of DEFAULT_CATEGORIES) {
      await prisma.category.create({ data: cat })
    }
    console.log('Категории созданы:', DEFAULT_CATEGORIES.map(c => c.name).join(', '))
  }

  // Seed price rows for all three services
  for (const service of ['starter', 'generator', 'conditioning']) {
    await prisma.priceRow.deleteMany({ where: { service } })

    for (let i = 0; i < MAIN_ROWS.length; i++) {
      await prisma.priceRow.create({ data: { service, tableType: 'main', sortOrder: i, ...MAIN_ROWS[i] } })
    }
    for (let i = 0; i < VAZ_ROWS.length; i++) {
      await prisma.priceRow.create({ data: { service, tableType: 'vaz', sortOrder: i, ...VAZ_ROWS[i] } })
    }
    console.log(`Прайс для "${service}" добавлен`)
  }
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
