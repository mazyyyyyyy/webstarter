import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductGallery from './ProductGallery'
import ProductInfo    from './ProductInfo'
import ProductTabs    from './ProductTabs'

const ProductCard = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/parts/${id}`)
      .then(r => r.json())
      .then(data => setProduct({
        ...data,
        specs:         Array.isArray(data.specs)         ? data.specs         : [],
        benefits:      Array.isArray(data.benefits)      ? data.benefits      : [],
        compatibility: Array.isArray(data.compatibility) ? data.compatibility : [],
      }))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="pc-page">
      <div className="container" style={{ paddingTop: 60, color: '#888' }}>Загрузка...</div>
    </div>
  )

  if (!product || product.error) return (
    <div className="pc-page">
      <div className="container" style={{ paddingTop: 60 }}>
        <p>Товар не найден.</p>
        <Link to="/parts" style={{ color: 'var(--blue)' }}>← Вернуться к запчастям</Link>
      </div>
    </div>
  )

  return (
    <div className="pc-page">
      <div className="container">
        <nav className="pc-breadcrumbs" aria-label="Хлебные крошки">
          <Link to="/"      className="pc-breadcrumbs__link">Главная</Link>
          <span className="pc-breadcrumbs__sep">/</span>
          <Link to="/parts" className="pc-breadcrumbs__link">Запчасти</Link>
          <span className="pc-breadcrumbs__sep">/</span>
          <span className="pc-breadcrumbs__current">{product.name}</span>
        </nav>

        <div className="pc-layout">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />
      </div>
    </div>
  )
}

export default ProductCard
