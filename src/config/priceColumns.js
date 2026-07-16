// Ключи столбцов, доступные в модели PriceRow (col0 — всегда «Наименование работ»)
export const ALL_COL_KEYS = ['col0', 'col1', 'col2', 'col3', 'col4', 'col5']

// Колонки по умолчанию (используются, пока в БД нет сохранённой конфигурации)
export const DEFAULT_COLUMNS = {
  starter: [
    { key: 'col0', label: 'Наименование работ' },
    { key: 'col2', label: '12В до 3 кВт' },
    { key: 'col3', label: '12В более 3 кВт' },
    { key: 'col4', label: '24В' },
    { key: 'col5', label: 'Более 140А' },
  ],
  generator: [
    { key: 'col0', label: 'Наименование работ' },
    { key: 'col2', label: 'С насосом' },
    { key: 'col4', label: '24В' },
    { key: 'col5', label: 'Более 140А' },
  ],
  turbo: [
    { key: 'col0', label: 'Наименование работ' },
    { key: 'col2', label: 'Легковой' },
    { key: 'col3', label: 'Грузовой' },
  ],
  conditioning: [
    { key: 'col0', label: 'Наименование работ' },
    { key: 'col2', label: 'Легковой' },
    { key: 'col3', label: 'Грузовой' },
  ],
}

// Ответ API /price-columns: [{ colKey, label, sortOrder }] → [{ key, label }]
// Если в БД для услуги ещё нет столбцов — берём значения по умолчанию.
export function normalizeColumns(apiRows, service) {
  if (Array.isArray(apiRows) && apiRows.length) {
    return apiRows.map(c => ({ key: c.colKey, label: c.label }))
  }
  return DEFAULT_COLUMNS[service] || DEFAULT_COLUMNS.starter
}
