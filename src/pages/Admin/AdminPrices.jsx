import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { ALL_COL_KEYS, DEFAULT_COLUMNS, normalizeColumns } from '../../config/priceColumns'

const SERVICES = [
  { key: 'starter',      label: 'Ремонт стартеров' },
  { key: 'generator',    label: 'Ремонт генераторов' },
  { key: 'turbo',        label: 'Ремонт турбокомпрессоров' },
  { key: 'conditioning', label: 'Кондиционирование' },
]

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
  col0: '', col1: '', col2: '', col3: '', col4: '', col5: '',
})

export default function AdminPrices() {
  const [service,    setService]    = useState('starter')
  const [rows,       setRows]       = useState([])
  const [columns,    setColumns]    = useState(DEFAULT_COLUMNS.starter)
  const [savedCols,  setSavedCols]  = useState(DEFAULT_COLUMNS.starter) // для сравнения «есть ли изменения»
  const [colsSaving, setColsSaving] = useState(false)
  const [editing,    setEditing]    = useState({})
  const [saving,     setSaving]     = useState({})
  const [adding,     setAdding]     = useState(false)
  const [newRow,     setNewRow]     = useState(emptyRow())

  const token   = localStorage.getItem('adminToken')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const colKeys = columns.map(c => c.key)
  const colsDirty = JSON.stringify(columns) !== JSON.stringify(savedCols)

  const load = () =>
    Promise.all([
      fetch(`/api/price-columns/${service}`).then(r => r.json()),
      fetch(`/api/prices/${service}`).then(r => r.json()),
    ]).then(([cols, data]) => {
      const normalized = normalizeColumns(cols, service)
      setColumns(normalized)
      setSavedCols(normalized)
      setRows(data.filter(r => r.tableType === 'main'))
    })

  useEffect(() => { load() }, [service])

  /* ── Управление столбцами ── */
  const addColumn = () => {
    const used = new Set(colKeys)
    const free = ALL_COL_KEYS.find(k => !used.has(k))
    if (!free) return alert('Достигнут максимум — 6 столбцов (ограничение базы данных).')
    setColumns(c => [...c, { key: free, label: 'Новый столбец' }])
  }

  const renameColumn = (key, label) =>
    setColumns(c => c.map(col => col.key === key ? { ...col, label } : col))

  const removeColumn = (key) => {
    if (key === columns[0].key) return // первый столбец (наименование) не удаляем
    if (!confirm('Удалить столбец? Данные в нём перестанут отображаться.')) return
    setColumns(c => c.filter(col => col.key !== key))
  }

  const moveColumn = (index, dir) => {
    const target = index + dir
    if (index === 0 || target <= 0 || target >= columns.length) return // col0 держим первым
    setColumns(c => {
      const next = [...c]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const saveColumns = async () => {
    setColsSaving(true)
    await fetch(`/api/price-columns/${service}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ columns: columns.map(c => ({ colKey: c.key, label: c.label })) }),
    })
    setColsSaving(false)
    await load()
  }

  const resetColumns = () => setColumns(savedCols)

  /* ── Строки прайса ── */
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
            onClick={() => { setService(s.key); setEditing({}); setAdding(false) }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Управление столбцами ── */}
      <div className="admin-section">
        <div className="admin-section-head">
          <h2 className="admin-section-title">Столбцы таблицы</h2>
          <button className="admin-btn admin-btn--outline admin-btn--sm" onClick={addColumn}>+ Добавить столбец</button>
        </div>

        <div className="admin-cols">
          {columns.map((col, i) => (
            <div className="admin-col-item" key={col.key}>
              <span className="admin-col-badge">{i === 0 ? 'Наименование' : `Столбец ${i}`}</span>
              <input
                className="admin-cell-input"
                value={col.label}
                onChange={e => renameColumn(col.key, e.target.value)}
                placeholder="Название столбца"
              />
              <div className="admin-col-controls">
                <button className="admin-btn admin-btn--sm" disabled={i <= 1} onClick={() => moveColumn(i, -1)} title="Влево">←</button>
                <button className="admin-btn admin-btn--sm" disabled={i === 0 || i === columns.length - 1} onClick={() => moveColumn(i, 1)} title="Вправо">→</button>
                <button
                  className="admin-btn admin-btn--sm admin-btn--danger"
                  disabled={i === 0}
                  onClick={() => removeColumn(col.key)}
                  title={i === 0 ? 'Первый столбец нельзя удалить' : 'Удалить'}
                >✕</button>
              </div>
            </div>
          ))}
        </div>

        {colsDirty && (
          <div className="admin-cols-save">
            <button className="admin-btn admin-btn--primary" disabled={colsSaving} onClick={saveColumns}>
              {colsSaving ? 'Сохранение...' : 'Сохранить столбцы'}
            </button>
            <button className="admin-btn" onClick={resetColumns}>Отменить изменения</button>
            <span className="admin-cols-hint">Не забудьте сохранить — иначе изменения столбцов не применятся.</span>
          </div>
        )}
      </div>

      {/* ── Строки прайса ── */}
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
              <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th>Действия</th></tr>
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
                  {columns.map(c => (
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
