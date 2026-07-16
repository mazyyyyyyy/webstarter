// Одноразовый скрипт оптимизации тяжёлых фоновых картинок в WebP.
// Запуск: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public', 'assets')

const FILES = [
  'starter_fo.png',
  'condit_fo.png',
  'generator_fo.png',
  'car_fo.png',
  'imgbiz.png',
  'avito_hero.png',
]

const kb = (p) => (statSync(p).size / 1024).toFixed(0)

for (const name of FILES) {
  const src = join(dir, name)
  const out = join(dir, name.replace(/\.png$/, '.webp'))
  const before = kb(src)
  await sharp(src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  console.log(`${name}: ${before} KB  ->  ${kb(out)} KB  (${name.replace(/\.png$/, '.webp')})`)
}
