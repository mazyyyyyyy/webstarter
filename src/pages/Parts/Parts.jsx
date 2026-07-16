import PartsPromo    from './PartsPromo'
import PartsFeatures from './PartsFeatures'
import PartsCatalog  from './PartsCatalog'

const Parts = () => (
  <div className="parts-page">
    <PartsPromo />

    <img
      className="parts-page__hero"
      src='/assets/avito_hero.webp'
      alt=""
      loading="lazy"
    />
    
    <PartsFeatures />

    <PartsCatalog />
  </div>
)

export default Parts
