import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartIcon = () => (
  <img src="/assets/Shopikon.svg" width={24} alt="" />
)

const StarRow = () => (
  <div className="stars" aria-label="Рейтинг 5 звёзд">
    {[...Array(5)].map((_, i) => (
      <svg key={i} viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
)

const PAGE_SIZE = 3

const Categories = () => {
  const { addItem } = useCart()
  const [cats,    setCats]    = useState([])
  const [parts,   setParts]   = useState([])
  const [active,  setActive]  = useState(null)
  const [page,    setPage]    = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        setCats(data)
        if (data.length > 0) setActive(data[0].id)
      })
  }, [])

  useEffect(() => {
    if (active == null) return
    setLoading(true)
    setPage(0)
    fetch(`/api/parts?categoryId=${active}`)
      .then(r => r.json())
      .then(data => { setParts(data); setLoading(false) })
  }, [active])

  if (cats.length === 0) return null

  // Chunk parts into slides of PAGE_SIZE
  const slides = []
  for (let i = 0; i < parts.length; i += PAGE_SIZE) {
    slides.push(parts.slice(i, i + PAGE_SIZE))
  }
  const totalPages = slides.length

  return (
    <section className="section categories">
      <div className="section__head">
        <h2 className="section__title">Категории</h2>
        <div className="section__line" />
      </div>

      <div className="filter-bar" role="tablist" aria-label="Категории товаров">
        {cats.map(cat => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={active === cat.id}
            className={`filter-tab ${active === cat.id ? 'filter-tab--active' : 'filter-tab--outline'}`}
            onClick={() => setActive(cat.id)}
          >
            {cat.name}
          </button>
        ))}
        <Link to="/parts" className="filter-all">
          Смотреть все&nbsp;<span className="icon-arrow" style={{ borderColor: 'var(--blue)' }} />
        </Link>
      </div>

      <div className="products-slider">
        <button
          className="slider-btn slider-btn--prev"
          aria-label="Предыдущий"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          style={{ opacity: page === 0 ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div className="products-track-wrap">
          {loading && <p style={{ color: '#64748b', padding: '40px 0', minHeight: 340 }}>Загрузка...</p>}

          {!loading && parts.length === 0 && (
            <p style={{ color: '#94a3b8', padding: '40px 0', minHeight: 340 }}>В этой категории пока нет товаров</p>
          )}

          {!loading && slides.length > 0 && (
            <div
              className="products-track"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {slides.map((slide, idx) => (
                <div key={idx} className="products-track-slide">
                  {slide.map(p => (
                    <Link to={`/parts/${p.id}`} key={p.id} style={{ textDecoration: 'none' }}>
                      <article className="product-card">
                        <div className="product-card__img-wrap">
                          <img
                            className="product-card__img"
                            src={p.images?.[0] || '/assets/starter_rep.png'}
                            alt={p.name}
                          />
                        </div>
                        <StarRow />
                        <h3 className="product-card__name">{p.name}</h3>
                        <div className="product-card__footer">
                          <span className="product-card__price">{p.price.toLocaleString('ru-RU')}&nbsp;₽</span>
                          <button
                            className="btn-cart"
                            aria-label="В корзину"
                            onClick={e => {
                              e.preventDefault()
                              addItem({ id: p.id, name: p.name, price: p.price, image: p.images?.[0] })
                            }}
                          >
                            <CartIcon />
                          </button>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="slider-btn slider-btn--next"
          aria-label="Следующий"
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          style={{ opacity: page >= totalPages - 1 ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </section>
  )
}

export default Categories
