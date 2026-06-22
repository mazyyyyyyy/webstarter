const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`)
  },
})

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

// Публичный: все запчасти (с фильтром ?categoryId=N&limit=N)
router.get('/', async (req, res) => {
  try {
    const where = {}
    if (req.query.categoryId) where.categoryId = Number(req.query.categoryId)

    const parts = await prisma.part.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      take:    req.query.limit ? Number(req.query.limit) : undefined,
      include: { category: true },
    })
    res.json(parts)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Публичный: одна запчасть
router.get('/:id', async (req, res) => {
  try {
    const part = await prisma.part.findUnique({ where: { id: Number(req.params.id) } })
    if (!part) return res.status(404).json({ error: 'Не найдено' })
    res.json(part)
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Загрузить фото
router.post('/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Файл не получен' })
  res.json({ path: `/uploads/${req.file.filename}` })
})

// Создать запчасть
router.post('/', auth, async (req, res) => {
  try {
    const { id, createdAt, updatedAt, category, ...data } = req.body
    const part = await prisma.part.create({ data })
    res.json(part)
  } catch (e) {
    console.error('POST /parts error:', e.message)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Изменить запчасть
router.put('/:id', auth, async (req, res) => {
  try {
    // Убираем поля, которые Prisma не принимает как скалярные
    const { id, createdAt, updatedAt, category, ...data } = req.body
    const part = await prisma.part.update({
      where: { id: Number(req.params.id) },
      data,
    })
    res.json(part)
  } catch (e) {
    console.error('PUT /parts/:id error:', e.message)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Удалить запчасть
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.part.delete({ where: { id: Number(req.params.id) } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

module.exports = router
