require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes       = require('./routes/auth')
const pricesRoutes     = require('./routes/prices')
const partsRoutes      = require('./routes/parts')
const categoriesRoutes = require('./routes/categories')

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth',       authRoutes)
app.use('/api/prices',     pricesRoutes)
app.use('/api/parts',      partsRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen(PORT, () => console.log(`API запущен на http://localhost:${PORT}`))
