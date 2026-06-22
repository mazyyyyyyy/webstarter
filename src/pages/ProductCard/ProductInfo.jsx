import { useCart } from '../../context/CartContext'

const CartIcon = () => <img src="/assets/Shopikon.svg" width={20} />

const BADGES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="#03275D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Гарантия',
    field: 'guarantee',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="#03275D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Доставка',
    field: 'delivery',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="#03275D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
    title: 'Возврат',
    field: 'returns',
  },
]

const FIXED_SPECS = [
  'Тип запчасти',
  'Напряжение',
  'Мощность',
  'Количество зубьев',
  'Производитель',
  'Применяемость',
  'OEM номер',
]

const val = v => (v && String(v).trim()) ? String(v) : '—'

const ProductInfo = ({ product }) => {
  const { addItem } = useCart()

  const getSpec = label => {
    const found = product.specs.find(s => s.label === label)
    return val(found?.value)
  }

  const allSpecs = [
    { label: 'Артикул', value: val(product.article) },
    ...FIXED_SPECS.map(label => ({ label, value: getSpec(label) })),
    ...product.specs.filter(s => !FIXED_SPECS.includes(s.label)),
  ]

  return (
    <div className="pc-info">

      <h2 className="pc-info__name">{product.name}</h2>

      <div className="pc-info__stock">
        <span className="pc-info__stock-dot"
          style={{ background: product.inStock ? '#ccf3d0' : '#fecaca' }} />
        <span className="pc-info__stock-label">
          {product.inStock ? 'в наличии' : 'нет в наличии'}
        </span>
      </div>

      <div className="pc-info__price">
        {product.price.toLocaleString('ru-RU')}&nbsp;₽
      </div>

      <div className="pc-info__actions">
        <button
          className="pc-info__btn-cart"
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] })}
        >
          <CartIcon />
          Добавить в корзину
        </button>
        <button className="pc-info__btn-buy">Купить в 1 клик</button>
      </div>

      <div className="pc-info__badges">
        {BADGES.map(b => (
          <div className="pc-info__badge" key={b.title}>
            <div className="pc-info__badge-icon">{b.icon}</div>
            <div className="pc-info__badge-texts">
              <span className="pc-info__badge-title">{b.title}</span>
              <span className="pc-info__badge-value">{val(product[b.field])}</span>
            </div>
          </div>
        ))}
      </div>

      <dl className="pc-info__specs">
        {allSpecs.map((s, i) => (
          <div className="pc-info__spec-row" key={i}>
            <dt className="pc-info__spec-label">{s.label}:</dt>
            <dd className="pc-info__spec-value"
              style={s.value === '—' ? { color: 'rgba(0,0,0,0.3)' } : {}}>
              {s.value || '—'}
            </dd>
          </div>
        ))}
      </dl>

    </div>
  )
}

export default ProductInfo
