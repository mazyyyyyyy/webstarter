const FEATURES = [
  {
    icon: '/v5_128.png',
    title: 'Профессиональное оборудование',
    desc:  'Используем современное оборудование для точной диагностики и ремонта.',
  },
  {
    icon: '/v5_129.png',
    title: 'Бесплатная диагностика',
    desc:  'Проверим агрегат на стенде и быстро определим причину неисправности.',
  },
  {
    icon: '/v5_131.png',
    title: 'Гарантия качества',
    desc:  'Предоставляем официальную гарантию до 6 месяцев на ремонт и установленные запчасти.',
  },
  {
    icon: '/v5_134.png',
    title: 'Более 10 лет опыта',
    desc:  'Работаем на рынке автоэлектрики более 10 лет и обслужили тысячи клиентов.',
  },
]

const DocumentIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#03275D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#03275D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#03275D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2"/>
    <path d="M16 8h4l3 5v3h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

const BUSINESS_FEATURES = [
  {
    icon: <DocumentIcon />,
    title: 'Безналичный расчет',
    desc:  'Работаем с юридическими лицами и ИП. Предоставляем полный пакет документов и удобные способы оплаты.',
  },
  {
    icon: <CalendarIcon />,
    title: 'Отсрочка платежа',
    desc:  'Предлагаем гибкие условия сотрудничества и возможность отсрочки платежа для постоянных клиентов.',
  },
  {
    icon: <TruckIcon />,
    title: 'Доставка',
    desc:  'Организуем быструю доставку отремонтированных агрегатов и запчастей по городу и в другие регионы.',
  },
]

const Features = ({ audience }) => {
  if (audience === 'business') {
    return (
      <div className="features">
        <div className="features__card features__card--business">
          {BUSINESS_FEATURES.map((f) => (
            <div className="feature-item" key={f.title}>
              <div className="feature-item__icon-circle">{f.icon}</div>
              <h3 className="feature-item__title feature-item__title--sm">{f.title}</h3>
              <p className="feature-item__desc feature-item__desc--sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="features" id="services">
      <div className="features__card">
        {FEATURES.map((f) => (
          <div className="feature-item" key={f.title}>
            <img className="feature-item__icon" src={f.icon} alt="" aria-hidden="true" />
            <h3 className="feature-item__title">{f.title}</h3>
            <p className="feature-item__desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
