const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Введите email и пароль' })

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({ token })
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

module.exports = router
