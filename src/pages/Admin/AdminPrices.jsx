import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

const SERVICES = [
  { key: 'starter',      label: 'Ремонт стартеров' },
  { key: 'generator',    label: 'Ремонт генераторов' },
  { key: 'conditioning', label: 'Кондиционирование' },
]

// { label, key } — key указывает на реальное поле в БД
const SERVICE_COLS = {
  starter: [
    { label: 'Наименование работ', key: 'col0' },
    { label: '12В до 3 кВт',       key: 'col2' },
    { label: '12В более 3 кВт',    key: 'col3' },
    { label: '24В',                key: 'col4' },
    { label: 'Более 140А',         key: 'col5' },
  ],
  generator: [
    { label: 'Наименование работ', key: 'col0' },
    { label: 'С насосом',          key: 'col2' },
    { label: '24В',                key: 'col4' },
    { label: 'Более 140А',         key: 'col5' },
  ],
  conditioning: [
    { label: 'Наименование работ', key: 'col0' },
    { label: 'Легковой',           key: 'col2' },
    { label: 'Грузовой',           key: 'col3' },
  ],
}

function EditRow({ row, editData, onEditChange, onSave, onCancel, saving, colKeys }) {
  return (
    <tr className="admin-price-row admin-price-row--editing">
      {colKeys.map(k => (
        <td key={k}>
          <input
            className="admin-cell-input"
            value={editData[k] || ''}
            onChange={ev => onEditChange(row.id, k, ev.target.value)}
          />
        </td>
      ))}
      <td>
        <div className="admin-price-actions">
          <button className="admin-btn admin-btn--sm admin-btn--primary" disabled={saving} onClick={() => onSave(row.id)}>
            {saving ? '...' : 'Сохранить'}
          </button>
          <button className="admin-btn admin-btn--sm" onClick={() => onCancel(row.id)}>Отмена</button>
        </div>
      </td>
    </tr>
  )
}

function ViewRow({ row, onEdit, onDelete, colKeys }) {
  return (
    <tr className="admin-price-row">
      {colKeys.map(k => <td key={k}>{row[k]}</td>)}
      <td>
        <div className="admin-price-actions">
          <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => onEdit(row)}>Изменить</button>
          <button className="admin-btn admin-btn--sm admin-btn--danger"  onClick={() => onDelete(row.id)}>Удалить</button>
        </div>
      </td>
    </tr>
  )
}

const emptyRow = () => ({
  tableType: 'main',
  col0: '', col1: '—', col2: '', col3: '', col4: '', col5: '',
})

export default function AdminPrices() {
  const [service,    setService]    = useState('starter')
  const [rows,       setRows]       = useState([])
  const [editing,    setEditing]    = useState({})
  const [saving,     setSaving]     = useState({})
  const [adding,     setAdding]     = useState(false)
  const [newRow,     setNewRow]     = useState(emptyRow())

  const token   = localStorage.getItem('adminToken')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const colDefs = SERVICE_COLS[service]
  const colKeys = colDefs.map(c => c.key)

  useEffect(() => { load() }, [service])

  const load = () =>
    fetch(`/api/prices/${service}`).then(r => r.json()).then(data => setRows(data.filter(r => r.tableType === 'main')))

  const startEdit  = row => setEditing(e => ({ ...e, [row.id]: { ...row } }))
  const cancelEdit = id  => setEditing(e => { const n = { ...e }; delete n[id]; return n })

  const onEditChange = (id, key, val) =>
    setEditing(ed => ({ ...ed, [id]: { ...ed[id], [key]: val } }))

  const saveRow = async id => {
    setSaving(s => ({ ...s, [id]: true }))
    await fetch(`/api/prices/${id}`, { method: 'PUT', headers, body: JSON.stringify(editing[id]) })
    setSaving(s => { const n = { ...s }; delete n[id]; return n })
    cancelEdit(id)
    load()
  }

  const deleteRow = async id => {
    if (!confirm('Удалить строку?')) return
    await fetch(`/api/prices/${id}`, { method: 'DELETE', headers })
    load()
  }

  const addRow = async () => {
    await fetch('/api/prices', {
      method: 'POST', headers,
      body: JSON.stringify({ ...newRow, service, tableType: 'main' }),
    })
    setNewRow(emptyRow())
    setAdding(false)
    load()
  }

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <h1 className="admin-page-title">Прайс-листы</h1>
      </div>

      <div className="admin-tabs">
        {SERVICES.map(s => (
          <button
            key={s.key}
            className={`admin-tab ${service === s.key ? 'admin-tab--active' : ''}`}
            onClick={() => { setService(s.key); setEditing({}) }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <h2 className="admin-section-title">Основной прайс</h2>
          {!adding && (
            <button className="admin-btn admin-btn--primary" onClick={() => setAdding(true)}>+ Добавить строку</button>
          )}
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>{colDefs.map(c => <th key={c.key}>{c.label}</th>)}<th>Действия</th></tr>
            </thead>
            <tbody>
              {rows.map(row =>
                editing[row.id]
                  ? <EditRow
                      key={row.id}
                      row={row}
                      editData={editing[row.id]}
                      onEditChange={onEditChange}
                      onSave={saveRow}
                      onCancel={cancelEdit}
                      saving={!!saving[row.id]}
                      colKeys={colKeys}
                    />
                  : <ViewRow
                      key={row.id}
                      row={row}
                      onEdit={startEdit}
                      onDelete={deleteRow}
                      colKeys={colKeys}
                    />
              )}
              {adding && (
                <tr className="admin-price-row admin-price-row--editing">
                  {colDefs.map(c => (
                    <td key={c.key}>
                      <input
                        className="admin-cell-input"
                        placeholder={c.label}
                        value={newRow[c.key] || ''}
                        onChange={e => setNewRow(d => ({ ...d, [c.key]: e.target.value }))}
                      />
                    </td>
                  ))}
                  <td>
                    <div className="admin-price-actions">
                      <button className="admin-btn admin-btn--sm admin-btn--primary" onClick={addRow}>Добавить</button>
                      <button className="admin-btn admin-btn--sm" onClick={() => setAdding(false)}>Отмена</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
