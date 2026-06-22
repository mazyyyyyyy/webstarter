const STEPS = [
  {
    num: '1',
    icon: (
       <img
                src="/assets/ikon_diagnost.svg"
                
            />
    ),
    label: 'Диагностика и определение причин неисправностей на автомобиле',
  },
  {
    num: '2',
    icon: (
      <img
                src="/assets/ikon_diagnost2.svg"
                
            />
    ),
    label: 'Поиск и определение причин неисправностей стартера',
  },
  {
    num: '3',
    icon: (
      <img
                src="/assets/ikon_diagnost3.svg"
                
            />
    ),
    label: 'Согласование с владельцем транспортного средства',
  },
  {
    num: '4',
    icon: (
      <img
                src="/assets/ikon_diagnost4.svg"
                
            />
    ),
    label: 'Восстановление работоспособности стартера',
  },
  {
    num: '5',
    icon: (
      <img
                src="/assets/ikon_diagnost5.svg"
                
            />
    ),
    label: 'Ремонт завершается повторным тестированием, автомобиль проходит выходной контроль',
  },
]

const Diagnostics = () => (
  <section className="sr-diagnostics">
    <div className="container">

      {/* Заголовок с синими линиями по бокам */}
      <div className="sr-diagnostics__head">
        <div className="sr-diagnostics__head-line" />
        <h2 className="sr-diagnostics__title">Этапы диагностики</h2>
        <div className="sr-diagnostics__head-line" />
      </div>

      <div className="sr-diagnostics__track">

        {/* Ряд 1: кружки в явных grid-column */}
        <div className="sr-diagnostics__bubbles">
          <div className="sr-diagnostics__bubble" style={{ gridColumn: 1 }}>
            <div className="sr-diagnostics__num"><div className="sr-diagnostics__num-inner">1</div></div>
            <div className="sr-diagnostics__step-icon">{STEPS[0].icon}</div>
          </div>
          <div className="sr-diagnostics__line" style={{ gridColumn: 2 }} />
          <div className="sr-diagnostics__bubble" style={{ gridColumn: 3 }}>
            <div className="sr-diagnostics__num"><div className="sr-diagnostics__num-inner">2</div></div>
            <div className="sr-diagnostics__step-icon">{STEPS[1].icon}</div>
          </div>
          <div className="sr-diagnostics__line" style={{ gridColumn: 4 }} />
          <div className="sr-diagnostics__bubble" style={{ gridColumn: 5 }}>
            <div className="sr-diagnostics__num"><div className="sr-diagnostics__num-inner">3</div></div>
            <div className="sr-diagnostics__step-icon">{STEPS[2].icon}</div>
          </div>
          <div className="sr-diagnostics__line" style={{ gridColumn: 6 }} />
          <div className="sr-diagnostics__bubble" style={{ gridColumn: 7 }}>
            <div className="sr-diagnostics__num"><div className="sr-diagnostics__num-inner">4</div></div>
            <div className="sr-diagnostics__step-icon">{STEPS[3].icon}</div>
          </div>
          <div className="sr-diagnostics__line" style={{ gridColumn: 8 }} />
          <div className="sr-diagnostics__bubble" style={{ gridColumn: 9 }}>
            <div className="sr-diagnostics__num"><div className="sr-diagnostics__num-inner">5</div></div>
            <div className="sr-diagnostics__step-icon">{STEPS[4].icon}</div>
          </div>
        </div>

        {/* Ряд 2: подписи в тех же колонках */}
        <div className="sr-diagnostics__labels">
          {STEPS.map((s, i) => (
            <p
              key={s.num}
              className="sr-diagnostics__label"
              style={{ gridColumn: i * 2 + 1 }}
            >
              {s.label}
            </p>
          ))}
        </div>

      </div>
    </div>
  </section>
)

export default Diagnostics