const STATS = [
  { label: 'ГАРАНТИЯ', value: '6 месяцев' },
  { label: '3 ФИЛИАЛА', value: '' },
  { label: 'РЕМОНТ', value: 'от 2 часов' },
]

const PERKS = [
  'Безналичный расчет',
  'Отсрочка платежа',
  'Доставка',
]

const ForBusiness = () => (
  <section className="for-business">
    <div className="container">
      <h1 className="for-business__title">
        Ремонт стартеров, генераторов, турбин<br/>
        и компрессоров кондиционеров
      </h1>
      <div className="for-business__divider" />

      <div className="for-business__row">
        <ul className="for-business__stats">
          {STATS.map((s) => (
            <li className="for-business__stat" key={s.label}>
              <span className="for-business__dot" aria-hidden="true" />
              <span>
                <span className="for-business__stat-label">{s.label}</span>
                {s.value && <span className="for-business__stat-value">{s.value}</span>}
              </span>
            </li>
          ))}
        </ul>

        <div className="for-business__perks">
          <h2 className="for-business__perks-title">
            Для автосервисов<br/>и организаций
          </h2>
          <ul className="for-business__perks-list">
            {PERKS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="for-business__image">
          <img src="/assets/imgbiz.png" alt="" aria-hidden="true" />
        </div>
      </div>

      <a href="tel:+73812388826" className="for-business__cta">
        <span className="for-business__cta-icon" aria-hidden="true">
          <img src="/assets/phone.svg" alt="" width={20} height={20} />
        </span>
        <span className="for-business__cta-text">Звоните сейчас!</span>
        <span className="for-business__cta-phone">(3812) 38-88-26</span>
      </a>
    </div>
  </section>
)

export default ForBusiness
