import { useState } from 'react'

const Bullet = () => <span className="pc-tabs__bullet" aria-hidden="true" />

const ProductTabs = ({ product }) => {
  const [active, setActive] = useState(0)

  const tabs = [
    { label: 'Описание',       show: true },
    { label: 'Характеристики', show: product.specs.length > 0 },
    { label: 'Применимость',   show: product.compatibility.length > 0 },
    { label: 'Отзывы',         show: true },
  ]

  const visible = tabs.filter(t => t.show)

  return (
    <section className="pc-tabs" aria-label="Информация о товаре">
      <div className="pc-tabs__bar" role="tablist">
        {visible.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active === i}
            className={`pc-tabs__tab ${active === i ? 'pc-tabs__tab--active' : ''}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pc-tabs__line" />

      {/* Описание */}
      {visible[active]?.label === 'Описание' && (
        <div className="pc-tabs__content">
          {product.description && (
            <p className="pc-tabs__desc">{product.description}</p>
          )}
          {product.benefits.length > 0 && (
            <>
              <h3 className="pc-tabs__benefits-title">Преимущества</h3>
              <ul className="pc-tabs__benefits">
                {product.benefits.map((b, i) => (
                  <li key={i} className="pc-tabs__benefit"><Bullet />{b}</li>
                ))}
              </ul>
            </>
          )}
          {!product.description && product.benefits.length === 0 && (
            <p className="pc-tabs__desc" style={{ color: 'rgba(0,0,0,0.4)' }}>Описание не добавлено</p>
          )}
        </div>
      )}

      {/* Характеристики */}
      {visible[active]?.label === 'Характеристики' && (
        <div className="pc-tabs__content">
          <dl className="pc-tabs__specs">
            {product.specs.map((s, i) => (
              <div className="pc-tabs__spec-row" key={i}>
                <dt className="pc-tabs__spec-label">{s.label}</dt>
                <dd className="pc-tabs__spec-value">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Применимость */}
      {visible[active]?.label === 'Применимость' && (
        <div className="pc-tabs__content">
          <ul className="pc-tabs__benefits">
            {product.compatibility.map((c, i) => (
              <li key={i} className="pc-tabs__benefit"><Bullet />{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Отзывы */}
      {visible[active]?.label === 'Отзывы' && (
        <div className="pc-tabs__content">
          <p className="pc-tabs__desc" style={{ color: 'rgba(0,0,0,0.5)' }}>
            Отзывов пока нет. Будьте первым!
          </p>
        </div>
      )}
    </section>
  )
}

export default ProductTabs
