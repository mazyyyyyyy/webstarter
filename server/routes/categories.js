const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

// Публичный: все категории
router.get('/', async (req, res) => {
  try {
    const cats = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })
    res.json(cats)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Создать
router.post('/', auth, async (req, res) => {
  try {
    const cat = await prisma.category.create({ data: req.body })
    res.json(cat)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Изменить
router.put('/:id', auth, async (req, res) => {
  try {
    const cat = await prisma.category.update({
      where: { id: Number(req.params.id) },
      data:  req.body,
    })
    res.json(cat)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Удалить
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: Number(req.params.id) } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

module.exports = router
