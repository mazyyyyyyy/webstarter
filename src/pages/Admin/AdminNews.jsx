import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

const MONTHS = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']

const empty = () => ({ title: '', text: '', day: '', month: 'янв' })

function NewsFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ ...initial })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal" style={{ maxWidth: 560 }}>
        <div className="admin-modal__head">
          <h2>{initial.id ? 'Редактировать новость' : 'Новая новость'}</h2>
          <button className="admin-modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="admin-modal__body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="admin-label">День *</label>
              <input
                className="admin-input"
                type="text"
                placeholder="27"
                value={form.day}
                onChange={e => set('day', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Месяц *</label>
              <select
                className="admin-input"
                value={form.month}
                onChange={e => set('month', e.target.value)}
              >
                {MONTHS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="admin-label">Заголовок *</label>
            <input
              className="admin-input"
              type="text"
              placeholder="Заголовок новости"
              value={form.title}
              onChange={e => set('title', e.target.value)}
            />
          </div>

          <div>
            <label className="admin-label">Текст *</label>
            <textarea
              className="admin-input"
              rows={6}
              placeholder="Текст новости..."
              style={{ resize: 'vertical' }}
              value={form.text}
              onChange={e => set('text', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-modal__footer">
          <button className="admin-btn" onClick={onClose}>Отмена</button>
          <button
            className="admin-btn admin-btn--primary"
            onClick={() => {
              if (!form.day || !form.title || !form.text) return alert('Заполните все поля')
              onSave(form)
            }}
          >
            {initial.id ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminNews() {
  const [items,   setItems]   = useState([])
  const [modal,   setModal]   = useState(null)

  const token   = localStorage.getItem('adminToken')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const load = () =>
    fetch('/api/news').then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : []))

  useEffect(() => { load() }, [])

  const openAdd  = ()    => setModal(empty())
  const openEdit = (item) => setModal({ ...item })
  const close    = ()    => setModal(null)

  const save = async (form) => {
    if (form.id) {
      await fetch(`/api/news/${form.id}`, { method: 'PUT', headers, body: JSON.stringify(form) })
    } else {
      await fetch('/api/news', { method: 'POST', headers, body: JSON.stringify(form) })
    }
    close()
    load()
  }

  const remove = async (id) => {
    if (!confirm('Удалить новость?')) return
    await fetch(`/api/news/${id}`, { method: 'DELETE', headers })
    load()
  }

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Новости</h1>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ Добавить новость</button>
      </div>

      {items.length === 0 && (
        <p style={{ color: '#94a3b8', padding: '40px 0' }}>Новостей пока нет</p>
      )}

      <div className="admin-news-grid">
        {items.map(item => (
          <div key={item.id} className="admin-news-card">
            <div className="admin-news-card__date">
              <span className="admin-news-card__day">{item.day}</span>
              <span className="admin-news-card__month">{item.month}</span>
            </div>
            <div className="admin-news-card__body">
              <h3 className="admin-news-card__title">{item.title}</h3>
              <p className="admin-news-card__text">{item.text}</p>
            </div>
            <div className="admin-news-card__actions">
              <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => openEdit(item)}>Изменить</button>
              <button className="admin-btn admin-btn--sm admin-btn--danger"  onClick={() => remove(item.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <NewsFormModal initial={modal} onSave={save} onClose={close} />
      )}
    </AdminLayout>
  )
}
