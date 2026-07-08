import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartIcon = () => (
  <img src="/assets/Shopikon.svg" width={20} />
)

const StarRow = () => (
  <div className="parts-stars" aria-label="Рейтинг 5 звёзд">
    {[...Array(5)].map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" fill="#FE820C" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
)

function getPageItems(page, total) {
  if (total <= 1) return []
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const delta = 2
  const rangeStart = Math.max(2, page - delta)
  const rangeEnd   = Math.min(total - 1, page + delta)

  const middle = []
  for (let i = rangeStart; i <= rangeEnd; i++) middle.push(i)

  const items = [1]
  if (rangeStart > 2) items.push('...')
  items.push(...middle)
  if (rangeEnd < total - 1) items.push('...')
  items.push(total)

  return items
}

const PER_PAGE = 12

const PartsCatalog = () => {
  const { addItem } = useCart()
  const [products, setProducts]     = useState([])
  const [search, setSearch]         = useState('')
  const [loading, setLoading]       = useState(true)
  const [activePage, setActivePage] = useState(1)

  useEffect(() => {
    fetch('/api/parts')
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((activePage - 1) * PER_PAGE, activePage * PER_PAGE)

  const goTo = (p) => {
    setActivePage(p)
  }

  return (
    <section className="parts-catalog">
      <div className="container">

        <div className="parts-catalog__search-wrap">
          <div className="parts-catalog__search-row">
            <svg className="parts-catalog__search-icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="parts-catalog__search-input"
              type="search"
              placeholder="Введите название или артикул..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActivePage(1) }}
            />
          </div>
        </div>

        {loading && <p style={{ padding: '40px 0', color: '#888' }}>Загрузка...</p>}

        {!loading && paged.length === 0 && (
          <p style={{ padding: '40px 0', color: '#888' }}>
            {search ? 'Ничего не найдено' : 'Запчасти пока не добавлены'}
          </p>
        )}

        <div className="parts-catalog__grid">
          {paged.map(p => (
            <article className="parts-card" key={p.id}>
              <Link to={`/parts/${p.id}`} className="parts-card__link">
                <div className="parts-card__img-wrap">
                  <img
                    className="parts-card__img"
                    src={p.images[0] || '/v5_160.png'}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>
                <StarRow />
                <h3 className="parts-card__name">{p.name}</h3>
              </Link>
              <div className="parts-card__footer">
                <span className="parts-card__price">{p.price.toLocaleString('ru-RU')}&nbsp;₽</span>
                <button
                  className="parts-card__btn"
                  aria-label="Добавить в корзину"
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.images?.[0] })}
                >
                  <CartIcon />
                </button>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="parts-pagination" aria-label="Пагинация">
            <button
              className="parts-pagination__arrow"
              onClick={() => goTo(activePage - 1)}
              disabled={activePage === 1}
              aria-label="Предыдущая страница"
            >
              ‹
            </button>

            {getPageItems(activePage, totalPages).map((item, idx) =>
              item === '...'
                ? <span key={`dots-${idx}`} className="parts-pagination__dots">…</span>
                : (
                  <button
                    key={item}
                    className={`parts-pagination__btn${activePage === item ? ' parts-pagination__btn--active' : ''}`}
                    onClick={() => goTo(item)}
                  >
                    {item}
                  </button>
                )
            )}

            <button
              className="parts-pagination__arrow"
              onClick={() => goTo(activePage + 1)}
              disabled={activePage === totalPages}
              aria-label="Следующая страница"
            >
              ›
            </button>
          </nav>
        )}

      </div>
    </section>
  )
}

export default PartsCatalog
