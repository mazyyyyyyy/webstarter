const FEATURES = [
  {
    icon: (
      <img
          src="/assets/ikon_avito1.svg"
          width={80}
          height={80}
          />
    ),
    title: 'Более 500 товаров',
    sub: 'в наличии',
  },
  {
    icon: (
      <img
          src="/assets/ikon_avito2.svg"
          width={80}
          height={80}
          />
    ),
    title: 'Проверенные',
    sub: 'продавцы',
  },
  {
    icon: (
      <img
          src="/assets/ikon_avito3.svg"
          width={80}
          height={80}
          />
    ),
    title: 'Быстрая доставка',
    sub: 'по всей России',
  },
  {
    icon: (
      <img
          src="/assets/ikon_avito4.svg"
          width={80}
          height={80}
          />
    ),
    title: 'Реальные отзывы',
    sub: 'покупателей',
  },
]

const PartsFeatures = () => (
  <section className="parts-features">
    <div className="container">
      <div className="parts-features__card">
        {FEATURES.map((f, i) => (
          <div className="parts-features__item" key={f.title}>
            <div className="parts-features__icon">{f.icon}</div>
            <div className="parts-features__texts">
              <span className="parts-features__title">{f.title}</span>
              <span className="parts-features__sub">{f.sub}</span>
            </div>
            {i < FEATURES.length - 1 && (
              <div className="parts-features__divider" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default PartsFeatures
