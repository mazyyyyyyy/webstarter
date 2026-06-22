import { useState, useEffect, useRef } from 'react'
import AdminLayout from './AdminLayout'

const DEFAULT_SPECS = [
  'Тип запчасти',
  'Напряжение',
  'Мощность',
  'Количество зубьев',
  'Производитель',
  'Применяемость',
  'OEM номер',
].map(label => ({ label, value: '' }))

const emptyPart = () => ({
  name: '', description: '', price: 0, inStock: true, images: [],
  article: '', guarantee: '6 месяцев', delivery: 'по всей России', returns: '14 дней',
  specs: DEFAULT_SPECS.map(s => ({ ...s })), benefits: [], compatibility: [],
})

export default function AdminParts() {
  const [parts,     setParts]     = useState([])
  const [cats,      setCats]      = useState([])
  const [search,    setSearch]    = useState('')
  const [modal,     setModal]     = useState(null)
  const [saving,    setSaving]    = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  const token   = localStorage.getItem('adminToken')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  useEffect(() => {
    load()
    fetch('/api/categories').then(r => r.json()).then(setCats)
  }, [])

  const load = () => fetch('/api/parts').then(r => r.json()).then(setParts)

  const openAdd  = ()   => setModal({ mode: 'add',  data: emptyPart() })
  const openEdit = part => setModal({ mode: 'edit', data: {
    ...emptyPart(), ...part,
    specs:         Array.isArray(part.specs)         ? part.specs         : [],
    benefits:      Array.isArray(part.benefits)      ? part.benefits      : [],
    compatibility: Array.isArray(part.compatibility) ? part.compatibility : [],
    images:        [...part.images],
  }})
  const close = () => setModal(null)

  const set = (field, value) =>
    setModal(m => ({ ...m, data: { ...m.data, [field]: value } }))

  // --- Specs helpers ---
  const addSpec = () => set('specs', [...modal.data.specs, { label: '', value: '' }])
  const setSpec = (i, key, val) => set('specs', modal.data.specs.map((s, idx) => idx === i ? { ...s, [key]: val } : s))
  const removeSpec = i => set('specs', modal.data.specs.filter((_, idx) => idx !== i))

  // --- List helpers (benefits / compatibility) ---
  const addItem  = field => set(field, [...modal.data[field], ''])
  const setItem  = (field, i, val) => set(field, modal.data[field].map((s, idx) => idx === i ? val : s))
  const removeItem = (field, i) => set(field, modal.data[field].filter((_, idx) => idx !== i))

  const uploadImage = async file => {
    setUploading(true)
    const fd = new FormData()
    fd.append('image', file)
    const res  = await fetch('/api/parts/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    const { path } = await res.json()
    setUploading(false)
    setModal(m => ({ ...m, data: { ...m.data, images: [...m.data.images, path] } }))
  }

  const removeImage = idx =>
    setModal(m => ({ ...m, data: { ...m.data, images: m.data.images.filter((_, i) => i !== idx) } }))

  const save = async () => {
    if (!modal.data.name.trim()) return
    setSaving(true)
    const body = { ...modal.data, price: Number(modal.data.price) }
    if (modal.mode === 'add') {
      await fetch('/api/parts',                  { method: 'POST', headers, body: JSON.stringify(body) })
    } else {
      await fetch(`/api/parts/${modal.data.id}`, { method: 'PUT',  headers, body: JSON.stringify(body) })
    }
    setSaving(false)
    close()
    load()
  }

  const del = async id => {
    if (!confirm('Удалить запчасть?')) return
    await fetch(`/api/parts/${id}`, { method: 'DELETE', headers })
    load()
  }

  const q = search.trim().toLowerCase()
  const filtered = q
    ? parts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.article.toLowerCase().includes(q)
      )
    : parts

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Запчасти</h1>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ Добавить запчасть</button>
      </div>

      <div className="admin-parts-search">
        <input
          className="admin-input"
          style={{ maxWidth: 380, marginBottom: 24 }}
          placeholder="Поиск по названию или артикулу..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {q && (
          <span style={{ marginLeft: 12, color: '#64748b', fontSize: 14 }}>
            Найдено: {filtered.length}
          </span>
        )}
      </div>

      {parts.length === 0 && <div className="admin-empty"><p>Запчастей пока нет. Добавьте первую!</p></div>}
      {parts.length > 0 && filtered.length === 0 && (
        <div className="admin-empty"><p>Ничего не найдено по запросу «{search}»</p></div>
      )}

      <div className="admin-parts-grid">
        {filtered.map(part => (
          <div key={part.id} className="admin-part-card">
            <div className="admin-part-card__img">
              {part.images[0]
                ? <img src={part.images[0]} alt={part.name} />
                : <span className="admin-part-card__no-img">Нет фото</span>}
            </div>
            <div className="admin-part-card__info">
              {part.article && <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3 }}>Арт. {part.article}</p>}
              <h3 className="admin-part-card__name">{part.name}</h3>
              <p className="admin-part-card__price">{part.price.toLocaleString('ru-RU')} ₽</p>
              <p className={`admin-part-card__stock ${part.inStock ? '' : 'admin-part-card__stock--out'}`}>
                {part.inStock ? '✓ В наличии' : '✗ Нет в наличии'}
              </p>
            </div>
            <div className="admin-part-card__actions">
              <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => openEdit(part)}>Изменить</button>
              <button className="admin-btn admin-btn--sm admin-btn--danger"  onClick={() => del(part.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && close()}>
          <div className="admin-modal" style={{ maxWidth: 620 }}>
            <div className="admin-modal__head">
              <h2>{modal.mode === 'add' ? 'Новая запчасть' : 'Редактировать'}</h2>
              <button className="admin-modal__close" onClick={close}>✕</button>
            </div>

            <div className="admin-modal__body">

              {/* Основное */}
              <p className="admin-modal__section-title">Основное</p>

              <label className="admin-label">Название *</label>
              <input className="admin-input" value={modal.data.name}
                onChange={e => set('name', e.target.value)} placeholder="Название запчасти" />

              <label className="admin-label">Категория</label>
              <select className="admin-input" value={modal.data.categoryId ?? ''}
                onChange={e => set('categoryId', e.target.value ? Number(e.target.value) : null)}>
                <option value="">— Без категории —</option>
                {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <label className="admin-label">Артикул</label>
              <input className="admin-input" value={modal.data.article}
                onChange={e => set('article', e.target.value)} placeholder="STA-00123" />

              <label className="admin-label">Описание</label>
              <textarea className="admin-input admin-textarea" value={modal.data.description}
                onChange={e => set('description', e.target.value)} placeholder="Описание..." />

              <label className="admin-label">Цена (₽)</label>
              <input className="admin-input" type="number" min="0" value={modal.data.price}
                onChange={e => set('price', e.target.value)} />

              <label className="admin-label" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={modal.data.inStock}
                  onChange={e => set('inStock', e.target.checked)} />
                В наличии
              </label>

              {/* Условия */}
              <p className="admin-modal__section-title" style={{ marginTop: 20 }}>Условия</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div>
                  <label className="admin-label">Гарантия</label>
                  <input className="admin-input" value={modal.data.guarantee}
                    onChange={e => set('guarantee', e.target.value)} placeholder="6 месяцев" />
                </div>
                <div>
                  <label className="admin-label">Доставка</label>
                  <input className="admin-input" value={modal.data.delivery}
                    onChange={e => set('delivery', e.target.value)} placeholder="по всей России" />
                </div>
                <div>
                  <label className="admin-label">Возврат</label>
                  <input className="admin-input" value={modal.data.returns}
                    onChange={e => set('returns', e.target.value)} placeholder="14 дней" />
                </div>
              </div>

              {/* Характеристики */}
              <p className="admin-modal__section-title" style={{ marginTop: 20 }}>Характеристики</p>
              {modal.data.specs.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="admin-input" style={{ flex: 1 }} placeholder="Параметр (напр. Напряжение)"
                    value={s.label} onChange={e => setSpec(i, 'label', e.target.value)} />
                  <input className="admin-input" style={{ flex: 1 }} placeholder="Значение (напр. 12V)"
                    value={s.value} onChange={e => setSpec(i, 'value', e.target.value)} />
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => removeSpec(i)}>✕</button>
                </div>
              ))}
              <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={addSpec}>+ Добавить характеристику</button>

              {/* Преимущества */}
              <p className="admin-modal__section-title" style={{ marginTop: 20 }}>Преимущества</p>
              {modal.data.benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="admin-input" style={{ flex: 1 }} placeholder="Преимущество"
                    value={b} onChange={e => setItem('benefits', i, e.target.value)} />
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => removeItem('benefits', i)}>✕</button>
                </div>
              ))}
              <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => addItem('benefits')}>+ Добавить</button>

              {/* Применимость */}
              <p className="admin-modal__section-title" style={{ marginTop: 20 }}>Применимость</p>
              {modal.data.compatibility.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="admin-input" style={{ flex: 1 }} placeholder="Напр. Audi 100 (C3) 1982–1990"
                    value={c} onChange={e => setItem('compatibility', i, e.target.value)} />
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => removeItem('compatibility', i)}>✕</button>
                </div>
              ))}
              <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => addItem('compatibility')}>+ Добавить</button>

              {/* Фото */}
              <p className="admin-modal__section-title" style={{ marginTop: 20 }}>Фотографии</p>
              <div className="admin-images">
                {modal.data.images.map((img, i) => (
                  <div key={i} className="admin-image-thumb">
                    <img src={img} alt="" />
                    <button className="admin-image-remove" onClick={() => removeImage(i)}>✕</button>
                  </div>
                ))}
                <button className="admin-image-add" onClick={() => fileRef.current.click()} disabled={uploading}>
                  {uploading ? '...' : '+ Фото'}
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
              </div>

            </div>

            <div className="admin-modal__footer">
              <button className="admin-btn" onClick={close}>Отмена</button>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving || !modal.data.name.trim()}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
