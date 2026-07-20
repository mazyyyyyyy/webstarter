import { useState, useEffect } from 'react'
import { DEFAULT_COLUMNS, normalizeColumns } from '../config/priceColumns'

/**
 * Общая таблица прайса для публичных страниц.
 * Столбцы берутся из БД (эндпоинт /price-columns/:service),
 * при их отсутствии — из DEFAULT_COLUMNS для услуги.
 */
const PriceTable = ({ service, hideStandNote = false }) => {
  const [rows, setRows]       = useState([])
  const [columns, setColumns] = useState(DEFAULT_COLUMNS[service] || DEFAULT_COLUMNS.starter)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`/api/price-columns/${service}`).then(r => r.json()),
      fetch(`/api/prices/${service}`).then(r => r.json()),
    ])
      .then(([cols, data]) => {
        setColumns(normalizeColumns(cols, service))
        setRows(data.filter(r => r.tableType === 'main'))
      })
      .finally(() => setLoading(false))
  }, [service])

  if (loading) return (
    <section className="sr-price"><div className="container"><p style={{ padding: '40px 0' }}>Загрузка...</p></div></section>
  )

  const [nameCol, ...valueCols] = columns

  return (
    <section className="sr-price" id="price">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Прайс</h2>
          <div className="section__line" />
        </div>

        <div className="sr-price__table-wrap">
          <table className="sr-price__table">
            <thead>
              <tr className="sr-price__head-row">
                <th className="sr-price__th sr-price__th--service">{nameCol?.label}</th>
                {valueCols.map(c => (
                  <th key={c.key} className="sr-price__th">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="sr-price__row">
                  <td className="sr-price__td sr-price__td--service">{r[nameCol?.key]}</td>
                  {valueCols.map(c => (
                    <td key={c.key} className="sr-price__td" data-label={c.label}>{r[c.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sr-price__notes">
          <p><img src="/assets/notes_ikon.svg" width={60} alt="" />
            Расходные материалы и запчасти, а также мойка, пескоструйная обработка, замена щёток варкой,
            ремонт втягивающего реле, высверливание шпилек и болтов, разворачивание втулок, восстановление
            резьбы, токарные и сварочные работы, снять и поставить защиту ДВС оплачивается отдельно.</p>
          <p><img src="/assets/notes_ikon2.svg" width={60} alt="" />
            Расходные материалы: припой — 30р, очиститель карбюратора/тормозов — 50р, эпоксидка — 50р,
            добавляются по необходимости.</p>
          {!hideStandNote && (
            <p><img src="/assets/notes_ikon3.svg" width={60} alt="" />
              Проверка на стенде без ремонта не более 1 раз в месяц.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default PriceTable
