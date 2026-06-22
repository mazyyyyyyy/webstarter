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

const Features = () => (
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

export default Features
