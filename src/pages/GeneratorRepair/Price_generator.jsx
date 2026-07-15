import { useState, useEffect } from 'react'

const Price_generator = () => {
  const [mainRows, setMainRows] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch('/api/prices/generator')
      .then(r => r.json())
      .then(data => setMainRows(data.filter(r => r.tableType === 'main')))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section className="sr-price"><div className="container"><p style={{ padding: '40px 0' }}>Загрузка...</p></div></section>
  )

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
                <th className="sr-price__th sr-price__th--service">Наименование работ</th>
                <th className="sr-price__th">С насосом</th>
                <th className="sr-price__th">24В</th>
                <th className="sr-price__th">Более 140А</th>
              </tr>
            </thead>
            <tbody>
              {mainRows.map(r => (
                <tr key={r.id} className="sr-price__row">
                  <td className="sr-price__td sr-price__td--service">{r.col0}</td>
                  <td className="sr-price__td" data-label="С насосом">{r.col2}</td>
                  <td className="sr-price__td" data-label="24В">{r.col4}</td>
                  <td className="sr-price__td" data-label="Более 140А">{r.col5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sr-price__notes">
          <p><img src="/assets/notes_ikon.svg" width={60} />
            Расходные материалы и запчасти, а также мойка, пескоструйная обработка, замена щёток варкой,
            ремонт втягивающего реле, высверливание шпилек и болтов, разворачивание втулок, восстановление
            резьбы, токарные и сварочные работы, снять и поставить защиту ДВС оплачивается отдельно.</p>
          <p><img src="/assets/notes_ikon2.svg" width={60} />
            Расходные материалы: припой — 30р, очиститель карбюратора/тормозов — 50р, эпоксидка — 50р,
            добавляются по необходимости.</p>
          <p><img src="/assets/notes_ikon3.svg" width={60} />
            Проверка на стенде без ремонта не более 1 раз в месяц.</p>
        </div>
      </div>
    </section>
  )
}

export default Price_generator
