const FEATURES = [
  {
    icon: (
      <img
          src="/assets/ikon_starter1.svg"
          alt="Phone"
          width={120}
          height={160}
          />
    ),
    title: <>Бесплатная проверка<br/>на стенде</>,
    desc:  'Проверим генератор и точно найдём причину неисправности',
  },
  {
    icon: (
      <img
          src="/assets/ikon_starter2.svg"
          alt="Phone"
          width={105}
          height={160}
          />
    ),
    title: 'Ремонт или замена от 2-х часов',
    desc:  'Оперативно восстановим работу вашего генератора',
  },
  {
    icon: (
        <img
          src="/assets/ikon_starter3.svg"
          alt="Phone"
          width={160}
          height={160}
          />
    ),
    title: 'Проверка на стенде',
    desc:  'Проверим генератор и точно найдём причину неисправности',
  },
  {
    icon: (
      <img
          src="/assets/ikon_starter4.svg"
          alt="Phone"
          width={180}
          height={180}
          />
    ),
    title: 'Ремонт осуществляется на профессиональном оборудовании',
    desc:  'Используем современное оборудование и качественные запчасти',
  },
]

const Features_generator = () => (
  <section className="sr-features">
    <div className="container">
      <div className="features__card_starter">
      <div className="sr-features__grid">
        {FEATURES.map((f) => (
          <div className="sr-features__card" key={f.title}>
            <div className="sr-features__icon">{f.icon}</div>
            <div className="sr-features__line" />
            <h3 className="sr-features__title">{f.title}</h3>
            <p className="sr-features__desc">{f.desc}</p>
          </div>
          
        ))}
      </div>
    </div>
    </div>
  </section>
)

export default Features_generator
