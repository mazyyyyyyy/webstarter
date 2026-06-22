import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'

const SERVICES = [
  { key: 'starter',      label: 'Ремонт стартеров' },
  { key: 'generator',    label: 'Ремонт генераторов' },
  { key: 'conditioning', label: 'Кондиционирование' },
]

const MAIN_COLS = ['Наименование работ', 'Стоимость', '12В до 3 кВт', '12В более 3 кВт', '24В', 'Более 140А']

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

  useEffect(() => { load() }, [service])

  const load = () =>
    fetch(`/api/prices/${service}`).then(r => r.json()).then(data => setRows(data.filter(r => r.tableType === 'main')))

  const startEdit  = row => setEditing(e => ({ ...e, [row.id]: { ...row } }))
  const cancelEdit = id  => setEditing(e => { const n = { ...e }; delete n[id]; return n })

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

  const colKeys = ['col0', 'col1', 'col2', 'col3', 'col4', 'col5']

  const EditRow = ({ row }) => {
    const e = editing[row.id]
    return (
      <tr className="admin-price-row admin-price-row--editing">
        {colKeys.map(k => (
          <td key={k}>
            <input
              className="admin-cell-input"
              value={e[k] || ''}
              onChange={ev => setEditing(ed => ({ ...ed, [row.id]: { ...ed[row.id], [k]: ev.target.value } }))}
            />
          </td>
        ))}
        <td>
          <div className="admin-price-actions">
            <button className="admin-btn admin-btn--sm admin-btn--primary" disabled={saving[row.id]} onClick={() => saveRow(row.id)}>
              {saving[row.id] ? '...' : 'Сохранить'}
            </button>
            <button className="admin-btn admin-btn--sm" onClick={() => cancelEdit(row.id)}>Отмена</button>
          </div>
        </td>
      </tr>
    )
  }

  const ViewRow = ({ row }) => (
    <tr className="admin-price-row">
      {colKeys.map(k => <td key={k}>{row[k]}</td>)}
      <td>
        <div className="admin-price-actions">
          <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => startEdit(row)}>Изменить</button>
          <button className="admin-btn admin-btn--sm admin-btn--danger"  onClick={() => deleteRow(row.id)}>Удалить</button>
        </div>
      </td>
    </tr>
  )

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
              <tr>{MAIN_COLS.map(c => <th key={c}>{c}</th>)}<th>Действия</th></tr>
            </thead>
            <tbody>
              {rows.map(row =>
                editing[row.id]
                  ? <EditRow key={row.id} row={row} />
                  : <ViewRow key={row.id} row={row} />
              )}
              {adding && (
                <tr className="admin-price-row admin-price-row--editing">
                  {colKeys.map((k, i) => (
                    <td key={k}>
                      <input
                        className="admin-cell-input"
                        placeholder={MAIN_COLS[i]}
                        value={newRow[k] || ''}
                        onChange={e => setNewRow(d => ({ ...d, [k]: e.target.value }))}
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
