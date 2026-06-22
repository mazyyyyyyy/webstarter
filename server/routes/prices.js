const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

// Публичный: получить строки прайса
router.get('/:service', async (req, res) => {
  try {
    const rows = await prisma.priceRow.findMany({
      where:   { service: req.params.service },
      orderBy: [{ tableType: 'asc' }, { sortOrder: 'asc' }],
    })
    res.json(rows)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Добавить строку
router.post('/', auth, async (req, res) => {
  try {
    const row = await prisma.priceRow.create({ data: req.body })
    res.json(row)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Изменить строку
router.put('/:id', auth, async (req, res) => {
  try {
    const row = await prisma.priceRow.update({
      where: { id: Number(req.params.id) },
      data:  req.body,
    })
    res.json(row)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Удалить строку
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.priceRow.delete({ where: { id: Number(req.params.id) } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

module.exports = router
