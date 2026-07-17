const STEPS = [
  {
    num: '1',
    icon: (
       <img
                src="/assets/ikon_diagnost.svg"

            />
    ),
    label: 'Разборка компрессора на отдельные компоненты',
  },
  {
    num: '2',
    icon: (
      <img
                src="/assets/ikon_diagnost2.svg"

            />
    ),
    label: 'Полная дефектовка разобранных элементов',
  },
  {
    num: '3',
    icon: (
      <img
                src="/assets/ikon_diagnost3.svg"

            />
    ),
    label: 'Сборка картриджа турбокомпрессора',
  },
  {
    num: '4',
    icon: (
      <img
                src="/assets/ikon_diagnost4.svg"

            />
    ),
    label: 'ВПроверка картриджа турбины на течи масла и балансировка',
  },
  {
    num: '5',
    icon: (
      <img
                src="/assets/ikon_diagnost5.svg"

            />
    ),
    label: 'Сборка и полная настройка турбокомпрессора для дальнейшей работы',
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

      {/* Мобильная раскладка: иконка слева, текст справа, список вниз */}
      <div className="sr-diagnostics__mobile-list">
        {STEPS.map(s => (
          <div className="sr-diagnostics__mobile-item" key={s.num}>
            <div className="sr-diagnostics__mobile-icon">
              <div className="sr-diagnostics__num"><div className="sr-diagnostics__num-inner">{s.num}</div></div>
              <div className="sr-diagnostics__step-icon">{s.icon}</div>
            </div>
            <p className="sr-diagnostics__mobile-label">{s.label}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
)

export default Diagnostics
