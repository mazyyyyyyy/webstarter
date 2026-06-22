import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

export default function AdminCategories() {
  const [cats,    setCats]    = useState([])
  const [name,    setName]    = useState('')
  const [editing, setEditing] = useState(null) // { id, name }
  const [saving,  setSaving]  = useState(false)

  const token   = localStorage.getItem('adminToken')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])

  const load = () => fetch('/api/categories').then(r => r.json()).then(setCats)

  const add = async () => {
    if (!name.trim()) return
    setSaving(true)
    await fetch('/api/categories', { method: 'POST', headers, body: JSON.stringify({ name: name.trim(), sortOrder: cats.length }) })
    setName('')
    setSaving(false)
    load()
  }

  const saveEdit = async () => {
    if (!editing.name.trim()) return
    setSaving(true)
    await fetch(`/api/categories/${editing.id}`, { method: 'PUT', headers, body: JSON.stringify({ name: editing.name.trim() }) })
    setEditing(null)
    setSaving(false)
    load()
  }

  const del = async id => {
    if (!confirm('Удалить категорию? Запчасти в ней не удалятся.')) return
    await fetch(`/api/categories/${id}`, { method: 'DELETE', headers })
    load()
  }

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Категории</h1>
      </div>

      {/* Add form */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <input
          className="admin-input"
          style={{ maxWidth: 320 }}
          placeholder="Название новой категории"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <button className="admin-btn admin-btn--primary" onClick={add} disabled={saving || !name.trim()}>
          + Добавить
        </button>
      </div>

      {cats.length === 0 && <div className="admin-empty"><p>Категорий пока нет.</p></div>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th style={{ width: 180 }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cats.map(cat => (
            <tr key={cat.id}>
              <td style={{ color: '#94a3b8', width: 40 }}>{cat.id}</td>
              <td>
                {editing?.id === cat.id ? (
                  <input
                    className="admin-input"
                    style={{ margin: 0 }}
                    value={editing.name}
                    onChange={e => setEditing(ed => ({ ...ed, name: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(null) }}
                    autoFocus
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editing?.id === cat.id ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn admin-btn--sm admin-btn--primary" onClick={saveEdit} disabled={saving}>Сохранить</button>
                    <button className="admin-btn admin-btn--sm" onClick={() => setEditing(null)}>Отмена</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => setEditing({ id: cat.id, name: cat.name })}>Изменить</button>
                    <button className="admin-btn admin-btn--sm admin-btn--danger"  onClick={() => del(cat.id)}>Удалить</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  )
}
